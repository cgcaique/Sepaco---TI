import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { supabase } from '../lib/supabaseClient';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parse = loginSchema.safeParse(formState);
    if (!parse.success) {
      setError('Preencha e-mail e senha válidos.');
      return;
    }
    setLoading(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithPassword(parse.data);
    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">Entrar</h1>
      <p className="mt-2 text-sm text-slate-600">Acesse sua conta CuidaJá.</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="text-sm text-slate-600">
          E-mail
          <input
            type="email"
            value={formState.email}
            onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
          />
        </label>
        <label className="text-sm text-slate-600">
          Senha
          <input
            type="password"
            value={formState.password}
            onChange={(event) => setFormState((prev) => ({ ...prev, password: event.target.value }))}
          />
        </label>
        {error && <p className="text-xs text-rose-600">{error}</p>}
        <button type="submit" className="w-full bg-brand-600 text-white" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        Não tem conta?{' '}
        <Link to="/signup" className="text-brand-600">
          Criar conta
        </Link>
      </p>
    </div>
  );
};
