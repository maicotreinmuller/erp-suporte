import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatters";
import FormModal from "./FormModal";
import PurchaseForm from "./PurchaseForm";
import { Purchase } from "@/db/database";
import { Edit2 } from "lucide-react";
import { toast } from "sonner";
import DeleteConfirmation from "./DeleteConfirmation";

interface PurchasesTableProps {
  purchases: Purchase[];
  onEdit: (id: number, data: any) => void;
  onDelete: (id: number) => void;
}

const PurchasesTable = ({ purchases, onEdit, onDelete }: PurchasesTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fornecedor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CPF/CNPJ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              NF
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Produto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {purchases.map((purchase) => (
            <tr key={purchase.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(purchase.date).toLocaleDateString('pt-BR')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {purchase.supplier}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {purchase.document}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {purchase.invoiceNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {purchase.product}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {purchase.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(purchase.value)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                <FormModal
                  title="Editar Compra"
                  triggerText={
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      title="Editar compra"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  }
                >
                  <PurchaseForm
                    onSubmit={(data) => onEdit(purchase.id!, data)}
                    initialData={purchase}
                  />
                </FormModal>
                <DeleteConfirmation 
                  onDelete={() => {
                    onDelete(purchase.id!);
                    toast.success('Compra excluída com sucesso!');
                  }}
                  description="Deseja realmente excluir esta compra?"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchasesTable;