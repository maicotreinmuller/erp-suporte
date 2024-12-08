import { useState } from "react";
import { Button } from "@/components/ui/button";
import FormModal from "@/components/FormModal";
import ClientForm from "@/components/ClientForm";
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { Edit2 } from "lucide-react";
import { db } from "@/db/database";
import { useQuery } from "@tanstack/react-query";
import SearchField from "@/components/SearchField";
import DeleteConfirmation from "@/components/DeleteConfirmation";

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: clients = [], refetch } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => await db.clients.toArray()
  });

  const handleExportToExcel = () => {
    const exportData = clients.map(client => ({
      'Nome': client.name,
      'CPF/CNPJ': client.document,
      'Email': client.email,
      'Telefone': client.phone,
      'CEP': client.cep,
      'Endereço': client.street,
      'Número': client.number,
      'Complemento': client.complement,
      'Bairro': client.neighborhood,
      'Cidade': client.city,
      'Estado': client.state,
      'Data de Cadastro': new Date(client.createdAt).toLocaleDateString('pt-BR'),
    }));
    
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clientes");
    XLSX.writeFile(wb, "clientes.xlsx");
    toast.success("Dados exportados com sucesso!");
  };

  const handleSubmit = async (data: any) => {
    await db.clients.add({
      ...data,
      createdAt: new Date(),
    });
    refetch();
    toast.success("Cliente cadastrado com sucesso!");
  };

  const handleEdit = async (id: number, data: any) => {
    await db.clients.update(id, data);
    refetch();
    toast.success("Cliente atualizado com sucesso!");
  };

  const handleDelete = async (id: number) => {
    try {
      const orders = await db.serviceOrders.where('clientId').equals(id).toArray();
      if (orders.length > 0) {
        toast.error("Não é possível excluir o cliente pois existem ordens de serviço vinculadas!");
        return;
      }

      await db.clients.delete(id);
      refetch();
      toast.success("Cliente excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir cliente!");
    }
  };

  const filteredClients = clients.filter(client =>
    Object.values(client).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="pl-64">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
            <div className="space-x-4">
              <Button variant="outline" onClick={handleExportToExcel}>
                Exportar Excel
              </Button>
              <FormModal title="Novo Cliente" triggerText="Novo Cliente">
                <ClientForm onSubmit={handleSubmit} />
              </FormModal>
            </div>
          </div>

          <div className="mb-6">
            <SearchField
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Pesquisar clientes..."
            />
          </div>

          <div className="bg-white rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPF/CNPJ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Endereço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {client.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.document}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {`${client.street}, ${client.number} - ${client.city}/${client.state}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                      <FormModal
                        title="Editar Cliente"
                        triggerText={
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                            title="Editar cliente"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        }
                      >
                        <ClientForm
                          onSubmit={(data) => handleEdit(client.id!, data)}
                          initialData={client}
                        />
                      </FormModal>
                      <DeleteConfirmation 
                        onDelete={() => handleDelete(client.id!)}
                        description="Deseja realmente excluir este cliente?"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
