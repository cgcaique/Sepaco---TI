import { useState } from 'react';
import { Card, PageHeader } from '../components/UI';

export const Availability = () => {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <div>
      <PageHeader title="Disponibilidade" subtitle="Gerencie seus slots e bloqueios." />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="text-base font-semibold">Adicionar slot semanal</h3>
          <form
            className="mt-4 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              setMessage('Slot cadastrado.');
            }}
          >
            <label className="text-sm text-slate-600">
              Dia da semana
              <select>
                <option>Segunda</option>
                <option>Terça</option>
                <option>Quarta</option>
                <option>Quinta</option>
                <option>Sexta</option>
              </select>
            </label>
            <label className="text-sm text-slate-600">
              Horário
              <input type="time" />
            </label>
            <button type="submit" className="bg-brand-600 text-white">
              Salvar slot
            </button>
          </form>
        </Card>
        <Card>
          <h3 className="text-base font-semibold">Bloquear período</h3>
          <form
            className="mt-4 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              setMessage('Bloqueio registrado.');
            }}
          >
            <label className="text-sm text-slate-600">
              Data
              <input type="date" />
            </label>
            <label className="text-sm text-slate-600">
              Motivo
              <input placeholder="Férias" />
            </label>
            <button type="submit" className="border border-slate-200 bg-white text-slate-700">
              Registrar bloqueio
            </button>
          </form>
        </Card>
      </div>
      {message && <p className="mt-4 text-xs text-emerald-600">{message}</p>}
    </div>
  );
};
