import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

const DashboardCard = ({ title, value, icon: Icon, description }: DashboardCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-600">{title}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {description && (
            <p className="text-sm text-gray-500 mt-2">{description}</p>
          )}
        </div>
        <div className="bg-primary/10 p-3 rounded-full">
          <Icon className="w-8 h-8 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;