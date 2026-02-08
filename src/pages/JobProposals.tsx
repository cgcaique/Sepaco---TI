import { Card, PageHeader, Badge, SectionTitle } from '../components/UI';

const proposals = [
  {
    id: 1,
    name: 'Maria Silva',
    price: 180,
    message: 'Disponível seg-qua à noite, experiência em pós-operatório.',
    skills: ['Pós-operatório', 'Acompanhamento noturno'],
    availability: 'Seg/Qua 19h-22h'
  },
  {
    id: 2,
    name: 'João Pereira',
    price: 220,
    message: 'Atendo na região com disponibilidade flexível.',
    skills: ['Cuidados gerais', 'Administração de medicamentos'],
    availability: 'Ter/Qui 14h-18h'
  }
];

export const JobProposals = () => (
  <div>
    <PageHeader title="Candidatos" subtitle="Compare propostas recebidas." />
    <SectionTitle label="Card: Cuidador noturno" />
    <div className="grid gap-4">
      {proposals.map((proposal) => (
        <Card key={proposal.id}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">{proposal.name}</h3>
              <p className="text-xs text-slate-500">{proposal.message}</p>
            </div>
            <Badge label={`R$ ${proposal.price}`} tone="success" />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {proposal.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {skill}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">Disponibilidade proposta: {proposal.availability}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="bg-brand-600 text-white">Selecionar</button>
            <button className="border border-slate-200 bg-white text-slate-700">Contra-proposta</button>
          </div>
        </Card>
      ))}
    </div>
  </div>
);
