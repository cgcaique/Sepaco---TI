import { Card, PageHeader, Badge } from '../components/UI';

const professionals = [
  {
    id: 1,
    name: 'Fernanda Oliveira',
    profession: 'Enfermeira',
    price: 200,
    location: 'São Paulo - SP',
    status: 'approved'
  },
  {
    id: 2,
    name: 'Carlos Lima',
    profession: 'Fisioterapeuta',
    price: 180,
    location: 'Campinas - SP',
    status: 'approved'
  }
];

export const Marketplace = () => (
  <div>
    <PageHeader
      title="Marketplace de Profissionais"
      subtitle="Somente profissionais aprovados aparecem aqui."
    />
    <Card>
      <div className="grid gap-3 md:grid-cols-3">
        <input placeholder="Habilidades" />
        <input placeholder="Preço máximo" />
        <input placeholder="Localização" />
      </div>
    </Card>
    <div className="mt-4 grid gap-4">
      {professionals.map((professional) => (
        <Card key={professional.id}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">{professional.name}</h3>
              <p className="text-xs text-slate-500">
                {professional.profession} · {professional.location}
              </p>
            </div>
            <Badge label={`R$ ${professional.price}/hora`} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="bg-brand-600 text-white">Ver perfil</button>
            <button className="border border-slate-200 bg-white text-slate-700">Solicitar agendamento</button>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Endereço completo oculto até confirmação do match.
          </p>
        </Card>
      ))}
    </div>
  </div>
);
