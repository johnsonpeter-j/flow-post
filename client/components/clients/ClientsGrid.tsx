import ClientCard from './ClientCard';
import AddClientCard from './AddClientCard';
import type { Client, ClientStats } from './types';

interface ClientsGridProps {
  clients: Client[];
  getClientStats: (clientId: string) => ClientStats;
  onAddClient: () => void;
}

export default function ClientsGrid({
  clients,
  getClientStats,
  onAddClient,
}: ClientsGridProps) {
  return (
    <div className="flex-1 p-5 overflow-y-auto grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 content-start">
      {clients.map((client) => {
        const stats = getClientStats(client.id);
        return <ClientCard key={client.id} client={client} stats={stats} />;
      })}
      <AddClientCard onClick={onAddClient} />
    </div>
  );
}






