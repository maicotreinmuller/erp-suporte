import { Link, useLocation } from "react-router-dom";
import { Users, ClipboardList, LayoutDashboard, ShoppingCart, Calendar, Database } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const menuItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/clients", icon: Users, label: "Clientes" },
    { path: "/service-orders", icon: ClipboardList, label: "Ordens de Serviço" },
    { path: "/purchases", icon: ShoppingCart, label: "Compras" },
    { path: "/schedule", icon: Calendar, label: "Agenda" },
    { path: "/data-management", icon: Database, label: "Gerenciar Dados" },
  ];

  return (
    <div className="h-screen w-64 bg-secondary p-4 fixed left-0 top-0 z-50">
      <div className="text-white text-2xl font-bold mb-8 p-4">
        ERP Suporte
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-primary text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;