import { Button } from "@/components/ui/button";
import FormModal from "./FormModal";
import ScheduleForm from "./ScheduleForm";
import { Schedule } from "@/db/database";
import { Edit2 } from "lucide-react";
import { toast } from "sonner";
import DeleteConfirmation from "./DeleteConfirmation";

interface ScheduleTableProps {
  schedules: Schedule[];
  onEdit: (id: number, data: any) => void;
  onDelete: (id: number) => void;
}

const ScheduleTable = ({ schedules, onEdit, onDelete }: ScheduleTableProps) => {
  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      low: "Baixa",
      normal: "Normal",
      high: "Alta",
      urgent: "Urgente",
    };
    return labels[priority] || priority;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Pendente",
      in_progress: "Em Andamento",
      completed: "Concluída",
      cancelled: "Cancelada",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      normal: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
    };
    return colors[priority as keyof typeof colors];
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prioridade
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {schedules.map((schedule) => (
            <tr key={schedule.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(schedule.date).toLocaleDateString('pt-BR')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {schedule.clientName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {schedule.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(schedule.priority)}`}>
                  {getPriorityLabel(schedule.priority)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(schedule.status)}`}>
                  {getStatusLabel(schedule.status)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                <FormModal
                  title="Editar Agendamento"
                  triggerText={
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      title="Editar agendamento"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  }
                >
                  <ScheduleForm
                    onSubmit={(data) => onEdit(schedule.id!, data)}
                    initialData={schedule}
                  />
                </FormModal>
                <DeleteConfirmation 
                  onDelete={() => {
                    onDelete(schedule.id!);
                    toast.success('Agendamento excluído com sucesso!');
                  }}
                  description="Deseja realmente excluir este agendamento?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
