import { Users, ClipboardList, TrendingUp, AlertCircle, CheckCircle, XCircle, Clock } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/db/database";

const Index = () => {
  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => await db.clients.toArray()
  });

  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => await db.serviceOrders.toArray()
  });

  const recentOrders = orders?.slice(0, 5) || [];
  const totalClients = clients?.length || 0;
  const ordersInProgress = orders?.filter(o => o.status === 'in_progress').length || 0;
  const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0;
  const completedOrders = orders?.filter(o => o.status === 'completed').length || 0;
  const cancelledOrders = orders?.filter(o => o.status === 'cancelled').length || 0;
  const monthlyRevenue = orders?.reduce((acc, order) => acc + (order.value || 0), 0) || 0;

  return (
    <div className="p-8 ml-64">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total de Clientes"
          value={totalClients}
          icon={Users}
        />
        <DashboardCard
          title="Ordens em Andamento"
          value={ordersInProgress}
          icon={Clock}
        />
        <DashboardCard
          title="Ordens Pendentes"
          value={pendingOrders}
          icon={AlertCircle}
        />
        <DashboardCard
          title="Ordens Concluídas"
          value={completedOrders}
          icon={CheckCircle}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <DashboardCard
          title="Ordens Canceladas"
          value={cancelledOrders}
          icon={XCircle}
        />
        <DashboardCard
          title="Faturamento Mensal"
          value={`R$ ${monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={TrendingUp}
        />
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Ordens Recentes</h2>
        <div className="w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">OS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serviço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.clientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${order.status === "in_progress" ? "bg-blue-100 text-blue-800" : 
                        order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        order.status === "completed" ? "bg-green-100 text-green-800" :
                        "bg-red-100 text-red-800"}`}>
                      {order.status === "in_progress" ? "Em Andamento" :
                       order.status === "pending" ? "Pendente" :
                       order.status === "completed" ? "Concluída" :
                       "Cancelada"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Index;