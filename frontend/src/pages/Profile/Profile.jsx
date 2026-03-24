import { useState } from 'react';
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
    email: user?.email || ''
  });
  // Estado para gerenciamento de dados de senha, erros, carregamento e mensagens de sucesso
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

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
      await userService.updateProfile(formData.name, formData.email);
      updateUser({ name: formData.name, email: formData.email });
      setSuccess('✓ Perfil atualizado com sucesso!');
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
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
          {user?.name?.charAt(0).toUpperCase()}
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