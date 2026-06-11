import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

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
    <div className="auth-page">
      <div className="auth-card card">
        <h1>Registracija</h1>
        <p className="auth-subtitle">Kreiraj nalog i uđi u ligu</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Ime za tabelu</label>
            <input className="input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required minLength={2} />
          </div>
          <div className="form-group">
            <label className="label">Email</label>
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="label">Lozinka (min. 6)</label>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          {error && <p className="error">{error}</p>}
          <button className="btn btn-primary auth-btn" type="submit" disabled={loading}>
            {loading ? 'Kreiram...' : 'Registracija'}
          </button>
        </form>

        <p className="auth-switch">
          Već imaš nalog? <Link to="/login">Prijavi se</Link>
        </p>
      </div>
    </div>
  );
}
