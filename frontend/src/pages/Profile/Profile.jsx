import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/api';
import { validators } from '../../utils/validators';
import { SettingsIcon, MailIcon, LockIcon, ProfileIcon as UserIcon, AlertIcon } from '../../components/icons/CustomIcons';
import './Profile.css';

// Página de perfil do usuário - permite visualizar e editar informações pessoais, alterar senha e configurar preferências da conta.
export const Profile = () => {
  // Obtém o usuário autenticado e funções de atualização e logout do contexto de autenticação
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [exportLoading, setExportLoading] = useState(false);
  const fileInputRef = useRef(null);
  // Estado para gerenciamento de dados de senha, erros, carregamento e mensagens de sucesso
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      avatar: user?.avatar || ''
    });
    setAvatarPreview(user?.avatar || '');
  }, [user]);

  const compressImageToDataUrl = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = 280;
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressed = canvas.toDataURL('image/jpeg', 0.78);
        resolve(compressed);
      };
      img.onerror = () => reject(new Error('Arquivo de imagem invalido.'));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error('Nao foi possivel ler o arquivo.'));
    reader.readAsDataURL(file);
  });

  const handleAvatarFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setErrors((prev) => ({ ...prev, avatar: undefined }));

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, avatar: 'Selecione um arquivo de imagem valido.' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, avatar: 'A imagem precisa ter no maximo 5MB.' }));
      return;
    }

    try {
      const compressedDataUrl = await compressImageToDataUrl(file);
      setAvatarPreview(compressedDataUrl);
      setFormData((prev) => ({ ...prev, avatar: compressedDataUrl }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, avatar: error.message }));
    }
  };

  // Função para atualizar as informações do perfil do usuário
  const handleUpdateProfile = async () => {
    setErrors({});
    setSuccess('');
    
    // Validações de nome e email usando os validadores definidos
    const nameResult = validators.name(formData.name);
    const emailResult = validators.email(formData.email);

    // Se houver erros de validação, atualiza o estado de erros e retorna
    if (!nameResult.valid || !emailResult.valid) {
      setErrors({
        name: nameResult.message,
        email: emailResult.message
      });
      return;
    }
    
    // Se as validações passarem, inicia o processo de atualização do perfil
    setLoading(true);
    try {
      const updatedUser = await userService.updateProfile(formData.name, formData.email, formData.avatar);
      updateUser({
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
      });
      setSuccess('✓ Perfil atualizado com sucesso!');
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleExportLGPD = async () => {
    setErrors({});
    setSuccess('');

    const password = prompt('Digite sua senha para confirmar a exportação dos dados:');
    if (!password) {
      return;
    }

    setExportLoading(true);

    try {
      const exportData = await userService.exportData(password);
      const fileName = `metamorfose-export-lgpd-${new Date().toISOString().slice(0, 10)}.json`;
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSuccess('✓ Exportacao LGPD gerada com sucesso.');
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setExportLoading(false);
    }
  };

  // Função para alterar a senha do usuário
  const handleChangePassword = async () => {
    setErrors({});
    setSuccess('');

    // Validações de senha usando os validadores definidos
    const currentResult = validators.password(passwordData.currentPassword);
    const newResult = validators.password(passwordData.newPassword);
    const confirmResult = validators.confirmPassword(passwordData.newPassword, passwordData.confirmPassword);

    // Se houver erros de validação, atualiza o estado de erros e retorna
    if (!currentResult.valid || !newResult.valid || !confirmResult.valid) {
      setErrors({
        currentPassword: currentResult.message,
        newPassword: newResult.message,
        confirmPassword: confirmResult.message
      });
      return;
    }

    // Se as validações passarem, inicia o processo de alteração de senha  
    setLoading(true);
    try {
      await userService.changePassword(passwordData.currentPassword, passwordData.newPassword);
      setSuccess('✓ Senha alterada com sucesso!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Função para deletar a conta do usuário - solicita confirmação e senha antes de proceder
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita!'
    );

    if (!confirmed) return;

    const password = prompt('Digite sua senha para confirmar:');
    if (!password) return;

    setLoading(true);
    try {
      await userService.deleteAccount(password);
      logout();
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar-large">
          {avatarPreview ? (
            <img src={avatarPreview} alt="Avatar do usuario" className="profile-avatar-large__img" />
          ) : (
            user?.name?.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          <UserIcon size={20} />
          Informações Pessoais
        </button>
        <button
          className={`tab ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          <LockIcon size={20} />
          Alterar Senha
        </button>
        <button
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <SettingsIcon size={20} />
          Configurações
        </button>
      </div>

      <div className="profile-content">
        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        {errors.general && (
          <div className="error-message">
            <AlertIcon size={20} />
            {errors.general}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="tab-content">
            <h2>Informações Pessoais</h2>
            
            <div className="form-group">
              <label>Avatar</label>
              <div className="profile-avatar-upload">
                <div className="profile-avatar-preview">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview do avatar" />
                  ) : (
                    <span>{formData.name?.charAt(0)?.toUpperCase() || '?'}</span>
                  )}
                </div>
                <div className="profile-avatar-upload-actions">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileChange}
                    className="profile-avatar-upload-input"
                  />
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Escolher imagem
                  </button>
                  {avatarPreview && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        setAvatarPreview('');
                        setFormData((prev) => ({ ...prev, avatar: '' }));
                      }}
                    >
                      Remover avatar
                    </button>
                  )}
                </div>
              </div>
              {errors.avatar && <span className="field-error">{errors.avatar}</span>}
            </div>

            <div className="form-group">
              <label>Nome</label>
              <div className="input-with-icon">
                <UserIcon size={20} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? 'error' : ''}
                />
              </div>
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>E-mail</label>
              <div className="input-with-icon">
                <MailIcon size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <button onClick={handleUpdateProfile} disabled={loading} className="btn-primary">
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="tab-content">
            <h2>Alterar Senha</h2>

            <div className="form-group">
              <label>Senha Atual</label>
              <div className="input-with-icon">
                <LockIcon size={20} />
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className={errors.currentPassword ? 'error' : ''}
                />
              </div>
              {errors.currentPassword && <span className="field-error">{errors.currentPassword}</span>}
            </div>

            <div className="form-group">
              <label>Nova Senha</label>
              <div className="input-with-icon">
                <LockIcon size={20} />
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className={errors.newPassword ? 'error' : ''}
                />
              </div>
              {errors.newPassword && <span className="field-error">{errors.newPassword}</span>}
            </div>

            <div className="form-group">
              <label>Confirmar Nova Senha</label>
              <div className="input-with-icon">
                <LockIcon size={20} />
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className={errors.confirmPassword ? 'error' : ''}
                />
              </div>
              {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
            </div>

            <button onClick={handleChangePassword} disabled={loading} className="btn-primary">
              {loading ? 'Alterando...' : 'Alterar Senha'}
            </button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="tab-content">
            <h2>Configurações da Conta</h2>

            <div className="profile-export-box">
              <h3>Exportacao de dados (LGPD - Art. 17)</h3>
              <p>Baixe uma copia estruturada dos seus dados pessoais, metas e historico de auditoria.</p>
              <button onClick={handleExportLGPD} disabled={exportLoading} className="btn-primary">
                {exportLoading ? 'Gerando arquivo...' : 'Exportar meus dados'}
              </button>
            </div>
            
            <div className="danger-zone">
              <h3>⚠️ Zona de Perigo</h3>
              <p>Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente deletados.</p>
              <button onClick={handleDeleteAccount} className="btn-danger">
                Deletar Minha Conta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};