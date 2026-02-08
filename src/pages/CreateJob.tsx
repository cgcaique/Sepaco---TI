import { useState } from 'react';
import { z } from 'zod';
import { supabase } from '../lib/supabaseClient';
import { Card, PageHeader } from '../components/UI';

const jobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  budget: z.string().min(1),
  location: z.string().min(3)
});

export const CreateJob = () => {
  const [formState, setFormState] = useState({ title: '', description: '', budget: '', location: '' });
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parse = jobSchema.safeParse(formState);
    if (!parse.success) {
      setMessage('Preencha todos os campos obrigatórios.');
      return;
    }
    const { error } = await supabase.from('jobs').insert({
      title: parse.data.title,
      description: parse.data.description,
      budget: Number(parse.data.budget),
      location: parse.data.location,
      status: 'open'
    });
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage('Card criado com sucesso!');
    setFormState({ title: '', description: '', budget: '', location: '' });
  };

  return (
    <div>
      <PageHeader title="Criar card" subtitle="Publique uma nova necessidade de cuidado." />
      <Card>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="text-sm text-slate-600">
            Título
            <input
              value={formState.title}
              onChange={(event) => setFormState((prev) => ({ ...prev, title: event.target.value }))}
            />
          </label>
          <label className="text-sm text-slate-600">
            Descrição
            <textarea
              rows={4}
              value={formState.description}
              onChange={(event) => setFormState((prev) => ({ ...prev, description: event.target.value }))}
            />
          </label>
          <label className="text-sm text-slate-600">
            Orçamento sugerido (R$)
            <input
              value={formState.budget}
              onChange={(event) => setFormState((prev) => ({ ...prev, budget: event.target.value }))}
            />
          </label>
          <label className="text-sm text-slate-600">
            Localização aproximada
            <input
              value={formState.location}
              onChange={(event) => setFormState((prev) => ({ ...prev, location: event.target.value }))}
            />
          </label>
          {message && <p className="text-xs text-slate-600">{message}</p>}
          <button type="submit" className="bg-brand-600 text-white">
            Publicar card
          </button>
        </form>
      </Card>
    </div>
  );
};
