import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthShell from '../components/AuthShell';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Prijava"
      subtitle="Uđi u ligu i tipuj ishode i tačne rezultate"
      footer={(
        <p className="auth-switch">
          Nemaš nalog? <Link to="/register">Registruj se</Link>
        </p>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="login-email">Email</label>
          <input
            id="login-email"
            className="input auth-input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="login-password">Lozinka</label>
          <input
            id="login-password"
            className="input auth-input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-primary auth-btn" type="submit" disabled={loading}>
          {loading ? 'Prijavljujem...' : 'Uđi u ligu'}
        </button>
      </form>
    </AuthShell>
  );
}
