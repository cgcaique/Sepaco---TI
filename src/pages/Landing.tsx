import { Link } from 'react-router-dom';

export const Landing = () => (
  <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-white px-6 py-12">
    <header className="mx-auto flex max-w-5xl items-center justify-between">
      <span className="text-lg font-semibold text-brand-700">CuidaJá</span>
      <div className="flex gap-3">
        <Link to="/login" className="rounded-lg border border-brand-600 px-4 py-2 text-sm font-semibold text-brand-600">
          Entrar
        </Link>
        <Link to="/signup" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
          Cadastre-se
        </Link>
      </div>
    </header>

    <section className="mx-auto mt-16 grid max-w-5xl gap-10 md:grid-cols-2">
      <div>
        <p className="text-sm font-semibold text-brand-600">Marketplace de Home Care</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">
          Conecte clientes e profissionais de cuidado domiciliar com segurança.
        </h1>
        <p className="mt-4 text-sm text-slate-600">
          Publique um card e receba candidaturas ou escolha um profissional com disponibilidade real-time.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/signup?role=cliente" className="rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white">
            Sou cliente
          </Link>
          <Link to="/signup?role=profissional" className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
            Sou profissional
          </Link>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Como funciona</h2>
        <ul className="mt-4 space-y-4 text-sm text-slate-600">
          <li>
            <strong className="text-slate-900">Modo A:</strong> Cliente publica um card, profissionais aprovados se candidatam.
          </li>
          <li>
            <strong className="text-slate-900">Modo B:</strong> Cliente escolhe profissional com agenda e solicita agendamento.
          </li>
          <li>
            <strong className="text-slate-900">Chat seguro:</strong> mensagens e anexos com realtime.
          </li>
        </ul>
      </div>
    </section>
  </div>
);
