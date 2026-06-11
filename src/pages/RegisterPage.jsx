import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthShell from '../components/AuthShell';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(email, password, displayName);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Registracija"
      subtitle="Kreiraj nalog i takmiči se sa ekipom"
      footer={(
        <p className="auth-switch">
          Već imaš nalog? <Link to="/login">Prijavi se</Link>
        </p>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="register-name">Ime za tabelu</label>
          <input
            id="register-name"
            className="input auth-input"
            autoComplete="nickname"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            minLength={2}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="register-email">Email</label>
          <input
            id="register-email"
            className="input auth-input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="register-password">Lozinka (min. 6)</label>
          <input
            id="register-password"
            className="input auth-input"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-primary auth-btn" type="submit" disabled={loading}>
          {loading ? 'Kreiram...' : 'Kreiraj nalog'}
        </button>
      </form>
    </AuthShell>
  );
}
