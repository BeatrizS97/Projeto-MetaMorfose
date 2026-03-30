// API Route para CSRF token (simples para serverless)
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Gera um token CSRF simples (pode ser aprimorado)
    const token = Math.random().toString(36).substring(2);
    res.status(200).json({ csrfToken: token });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}