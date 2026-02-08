import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { supabase } from '../lib/supabaseClient';

const baseSchema = z.object({
  full_name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
});

const professionalSchema = baseSchema.extend({
  phone: z.string().min(8),
  profession: z.string().min(2),
  council: z.string().optional(),
  experience_years: z.string().min(1),
  address: z.string().min(5)
});

export const Signup = () => {
  const [params] = useSearchParams();
  const initialRole = params.get('role') ?? '';
  const [role, setRole] = useState(initialRole);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [clientForm, setClientForm] = useState({
    full_name: '',
    email: '',
    password: ''
  });
  const [professionalForm, setProfessionalForm] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    profession: '',
    council: '',
    experience_years: '',
    address: ''
  });

  const isProfessional = role === 'profissional';
  const title = useMemo(() => {
    if (isProfessional) return 'Cadastro de Profissional';
    if (role === 'cliente') return 'Cadastro de Cliente';
    return 'Crie sua conta';
  }, [role, isProfessional]);

  const handleClientSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parse = baseSchema.safeParse(clientForm);
    if (!parse.success) {
      setError('Confira seus dados antes de continuar.');
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: authError } = await supabase.auth.signUp({
      email: parse.data.email,
      password: parse.data.password
    });
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    await supabase.from('users_profile').insert({
      id: data.user?.id,
      full_name: parse.data.full_name,
      role: 'cliente'
    });
    await supabase.from('clients').insert({
      user_id: data.user?.id,
      full_name: parse.data.full_name
    });
    setLoading(false);
    setError('Conta criada! Faça login para continuar.');
  };

  const handleProfessionalSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parse = professionalSchema.safeParse(professionalForm);
    if (!parse.success) {
      setError('Complete todos os campos obrigatórios.');
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: authError } = await supabase.auth.signUp({
      email: parse.data.email,
      password: parse.data.password
    });
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    await supabase.from('users_profile').insert({
      id: data.user?.id,
      full_name: parse.data.full_name,
      role: 'profissional',
      status_verificacao: 'pending_review'
    });
    await supabase.from('professionals').insert({
      user_id: data.user?.id,
      full_name: parse.data.full_name,
      phone: parse.data.phone,
      profession: parse.data.profession,
      council: parse.data.council || null,
      experience_years: Number(parse.data.experience_years),
      address: parse.data.address,
      status_verificacao: 'pending_review'
    });
    setLoading(false);
    setError('Cadastro enviado! Aguarde aprovação.');
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      <p className="mt-2 text-sm text-slate-600">Preencha os dados para começar.</p>

      {!role && (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <button onClick={() => setRole('cliente')} className="bg-brand-600 text-white">
            Sou cliente
          </button>
          <button onClick={() => setRole('profissional')} className="border border-slate-200 bg-white text-slate-700">
            Sou profissional
          </button>
        </div>
      )}

      {role === 'cliente' && (
        <form className="mt-6 space-y-4" onSubmit={handleClientSubmit}>
          <label className="text-sm text-slate-600">
            Nome completo
            <input
              value={clientForm.full_name}
              onChange={(event) => setClientForm((prev) => ({ ...prev, full_name: event.target.value }))}
            />
          </label>
          <label className="text-sm text-slate-600">
            E-mail
            <input
              type="email"
              value={clientForm.email}
              onChange={(event) => setClientForm((prev) => ({ ...prev, email: event.target.value }))}
            />
          </label>
          <label className="text-sm text-slate-600">
            Senha
            <input
              type="password"
              value={clientForm.password}
              onChange={(event) => setClientForm((prev) => ({ ...prev, password: event.target.value }))}
            />
          </label>
          {error && <p className="text-xs text-rose-600">{error}</p>}
          <button type="submit" className="bg-brand-600 text-white" disabled={loading}>
            {loading ? 'Enviando...' : 'Criar conta'}
          </button>
        </form>
      )}

      {isProfessional && (
        <form className="mt-6 space-y-4" onSubmit={handleProfessionalSubmit}>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className={`h-2 w-2 rounded-full ${step >= 1 ? 'bg-brand-500' : 'bg-slate-200'}`} />
            <span>Etapa {step} de 3</span>
          </div>
          {step === 1 && (
            <>
              <label className="text-sm text-slate-600">
                Nome completo
                <input
                  value={professionalForm.full_name}
                  onChange={(event) => setProfessionalForm((prev) => ({ ...prev, full_name: event.target.value }))}
                />
              </label>
              <label className="text-sm text-slate-600">
                E-mail
                <input
                  type="email"
                  value={professionalForm.email}
                  onChange={(event) => setProfessionalForm((prev) => ({ ...prev, email: event.target.value }))}
                />
              </label>
              <label className="text-sm text-slate-600">
                Senha
                <input
                  type="password"
                  value={professionalForm.password}
                  onChange={(event) => setProfessionalForm((prev) => ({ ...prev, password: event.target.value }))}
                />
              </label>
            </>
          )}

          {step === 2 && (
            <>
              <label className="text-sm text-slate-600">
                Telefone
                <input
                  value={professionalForm.phone}
                  onChange={(event) => setProfessionalForm((prev) => ({ ...prev, phone: event.target.value }))}
                />
              </label>
              <label className="text-sm text-slate-600">
                Profissão
                <input
                  value={professionalForm.profession}
                  onChange={(event) => setProfessionalForm((prev) => ({ ...prev, profession: event.target.value }))}
                />
              </label>
              <label className="text-sm text-slate-600">
                Conselho (opcional)
                <input
                  value={professionalForm.council}
                  onChange={(event) => setProfessionalForm((prev) => ({ ...prev, council: event.target.value }))}
                />
              </label>
              <label className="text-sm text-slate-600">
                Anos de experiência
                <input
                  value={professionalForm.experience_years}
                  onChange={(event) => setProfessionalForm((prev) => ({ ...prev, experience_years: event.target.value }))}
                />
              </label>
            </>
          )}

          {step === 3 && (
            <>
              <label className="text-sm text-slate-600">
                Endereço completo
                <input
                  value={professionalForm.address}
                  onChange={(event) => setProfessionalForm((prev) => ({ ...prev, address: event.target.value }))}
                />
              </label>
              <label className="text-sm text-slate-600">
                Documento com foto
                <input type="file" />
              </label>
              <label className="text-sm text-slate-600">
                Comprovante de endereço
                <input type="file" />
              </label>
              <label className="text-sm text-slate-600">
                Certificados
                <input type="file" multiple />
              </label>
              <label className="text-sm text-slate-600">
                Documento do conselho (se aplicável)
                <input type="file" />
              </label>
            </>
          )}

          {error && <p className="text-xs text-rose-600">{error}</p>}
          <div className="flex flex-wrap gap-3">
            {step > 1 && (
              <button type="button" onClick={() => setStep((prev) => prev - 1)} className="border border-slate-200">
                Voltar
              </button>
            )}
            {step < 3 && (
              <button type="button" onClick={() => setStep((prev) => prev + 1)} className="bg-brand-600 text-white">
                Próxima etapa
              </button>
            )}
            {step === 3 && (
              <button type="submit" className="bg-brand-600 text-white" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar cadastro'}
              </button>
            )}
          </div>
        </form>
      )}

      <p className="mt-6 text-sm text-slate-600">
        Já tem conta?{' '}
        <Link to="/login" className="text-brand-600">
          Entrar
        </Link>
      </p>
    </div>
  );
};
