import { Link } from 'react-router-dom';

export const PendingApproval = () => (
  <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-10 text-center">
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900">Aguardando aprovação</h1>
      <p className="mt-3 text-sm text-slate-600">
        Seu cadastro foi recebido. O time CuidaJá está validando seus documentos e experiência. Você será
        avisado por e-mail quando estiver aprovado.
      </p>
      <Link to="/" className="mt-6 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
        Voltar para a landing
      </Link>
    </div>
  </div>
);
