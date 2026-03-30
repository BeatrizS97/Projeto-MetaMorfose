app.use(compression());

/**
 * Rate limiter global da API para reduzir abuso de endpoints.
 */
const apiLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.API_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => config.NODE_ENV === 'development',
  message: {
    error: 'Muitas requisições. Tente novamente em alguns minutos.',
  },
});

app.use('/api', apiLimiter);

// Middleware de parsing - Limitar tamanho para evitar DoS

/**
 * Limitar tamanho do corpo da requisição
 * Protege contra DoS por upload grande
 */
app.use(express.json({ limit: '1mb' })); // Permite avatar compactado sem abrir demais a superficie de ataque
app.use(express.urlencoded({ limit: '1mb', extended: true }));

/**
 * Sanitização simples para bloquear operadores de injeção no payload ($ e .)
 */
const hasDangerousKeys = (value) => {
  if (Array.isArray(value)) {
    return value.some(hasDangerousKeys);
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).some(([key, nestedValue]) => {
      if (key.startsWith('$') || key.includes('.')) {
        return true;
      }
      return hasDangerousKeys(nestedValue);
    });
  }

  return false;
};

app.use((req, res, next) => {
  if (hasDangerousKeys(req.body) || hasDangerousKeys(req.query) || hasDangerousKeys(req.params)) {
    return res.status(400).json({ error: 'Payload inválido' });
  }

  return next();
});

/**
 * Cookie Parser - Parsear cookies
 */
app.use(cookieParser());
app.use(verifyCsrfToken);

// Middleware de CORS - Configurado com segurança

/**
 * CORS - Controlar origem de requisições
 * Configurado com segurança em mente
 */
app.use(cors({
  origin: (origin, callback) => {
    // Permite clientes sem header Origin (curl, health checks internos)
    if (!origin) {
      return callback(null, true);
    }

    const allowedOrigins = config.CORS_ORIGIN;
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origem não permitida pelo CORS'));
  },
  credentials: true, // Permitir cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
  maxAge: 86400, // 24 horas
}));

// Middleware de logging - Logar requisições (pode ser aprimorado com winston ou morgan)

/**
 * Middleware para remover header X-Powered-By
 * Evita expor informações do servidor
 */
app.disable('x-powered-by');

/**
 * Middleware para adicionar ID de requisição (para logging)
 */
app.use((req, res, next) => {
  req.id = crypto.randomUUID();
  next();
});

// Conectar ao MongoDB com tratamento de erros e reconexão automática
const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB conectado com sucesso');
  } catch (err) {
    console.error('❌ Erro ao conectar ao MongoDB:', err.message);
    // Tentar reconectar após 5 segundos
    setTimeout(connectDatabase, 5000);
  }
};

connectDatabase();

// Rotas da API

/**
 * Rota de saúde - Verificar se servidor está rodando
 */
app.get('/api/health', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    status: isConnected ? 'ok' : 'disconnected',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    mongodb: isConnected ? 'connected' : 'disconnected',
  });
});

/**
 * Rotas de autenticação
 */
app.use('/api/auth', authRoutes);

/**
 * Rotas de metas
 */
app.use('/api/goals', goalsRoutes);

/**
 * Rotas de usuário/perfil
 */
app.use('/api/user', userRoutes);

// Tratamento de rotas não encontradas e erros globais

/**
 * Middleware para rotas não encontradas
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
  });
});

/**
 * Middleware de tratamento de erros global
 * Captura erros não tratados
 */
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);

  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(status).json({
    error: status >= 500 && config.NODE_ENV !== 'development' ? 'Erro interno do servidor' : message,
    requestId: req.id,
    timestamp: new Date().toISOString(),
    ...(config.NODE_ENV === 'development' && { stackTrace: err.stack }),
  });
});

// Iniciar servidor   
const server = app.listen(config.PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║           Servidor iniciado com sucesso                      ║
╠══════════════════════════════════════════════════════════════╣
║  Ambiente: ${config.NODE_ENV.padEnd(37)}                     ║
║  Porta: ${config.PORT.toString().padEnd(42)}                 ║
║  URL: http://localhost:${config.PORT}${' '.repeat(30)}       ║
║  CORS Origins: ${config.CORS_ORIGIN.join(', ').padEnd(31)}   ║
║  Secure Cookie: ${config.SECURE_COOKIE.toString().padEnd(30)}║
╚══════════════════════════════════════════════════════════════╝
  `);
});

/**
 * Tratamento de sinais para graceful shutdown
 * Fecha conexões de forma segura
 */
const gracefulShutdown = async (signal) => {
  console.log(`\n📛 Sinal recebido: ${signal}`);
  console.log('Encerrando servidor gracefully...');

  // Fechar servidor HTTP
  server.close(() => {
    console.log('✅ Servidor HTTP fechado');

    // Fechar conexão com MongoDB
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB desconectado');
      process.exit(0);
    });

    // Timeout para força o encerramento se necessário
    setTimeout(() => {
      console.error('❌ Falha ao fechar gracefully, forçando encerramento');
      process.exit(1);
    }, 10000);
  });
};

// Escutar sinais de encerramento
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Tratamento de exceções não capturadas
process.on('uncaughtException', (err) => {
  console.error('❌ Exceção não capturada:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejeitada não tratada:', promise, 'razão:', reason);
  process.exit(1);
});

module.exports = app;
