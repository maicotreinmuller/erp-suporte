import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormModal from "@/components/FormModal";
import ScheduleForm from "@/components/ScheduleForm";
import SearchField from "@/components/SearchField";
import ScheduleTable from "@/components/ScheduleTable";
import { toast } from "sonner";
import { db } from "@/db/database";
import { useQuery } from "@tanstack/react-query";

const Schedule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const { data: schedules = [], refetch } = useQuery({
    queryKey: ['schedules'],
    queryFn: async () => await db.schedules.toArray()
  });

  const handleSubmit = async (data: any) => {
    try {
      const client = await db.clients.get(data.clientId);
      if (!client) {
        toast.error("Cliente não encontrado!");
        return;
      }

      await db.schedules.add({
        ...data,
        clientName: client.name,
      });
      
      refetch();
      toast.success("Agendamento cadastrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar agendamento!");
    }
  };

  const handleEdit = async (id: number, data: any) => {
    try {
      const client = await db.clients.get(data.clientId);
      if (!client) {
        toast.error("Cliente não encontrado!");
        return;
      }

      await db.schedules.update(id, {
        ...data,
        clientName: client.name,
      });
      
      refetch();
      toast.success("Agendamento atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar agendamento!");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await db.schedules.delete(id);
      refetch();
      toast.success("Agendamento excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir agendamento!");
    }
  };

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = Object.values(schedule).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesDate = !dateFilter || new Date(schedule.date).toISOString().includes(dateFilter);
    return matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="pl-64">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
            <FormModal title="Novo Agendamento" triggerText="Novo Agendamento">
              <ScheduleForm onSubmit={handleSubmit} />
            </FormModal>
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchField
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Pesquisar agendamentos..."
            />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <ScheduleTable
                schedules={filteredSchedules}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;