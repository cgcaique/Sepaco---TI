import { useState } from 'react';
import { Card, PageHeader } from '../components/UI';

export const BookingRequest = () => {
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div>
      <PageHeader title="Solicitar agendamento" subtitle="Envie uma solicitação para o profissional escolhido." />
      <Card>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setMessage('Solicitação enviada!');
          }}
        >
          <label className="text-sm text-slate-600">
            Data preferida
            <input type="date" />
          </label>
          <label className="text-sm text-slate-600">
            Horário
            <input type="time" />
          </label>
          <label className="text-sm text-slate-600">
            Observações
            <textarea rows={3} />
          </label>
          {message && <p className="text-xs text-emerald-600">{message}</p>}
          <button type="submit" className="bg-brand-600 text-white">
            Enviar solicitação
          </button>
        </form>
      </Card>
    </div>
  );
};
