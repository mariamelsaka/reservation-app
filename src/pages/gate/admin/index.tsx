import AdminReport from "@components/AdminReports";
import Sidebar from "@components/Layout/SideBar";
import Button from "@components/Ui/Button";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const { pathname } = useLocation();
  const storageKey = "loggedInUser";
  // logout
  const onLogout = useCallback(() => {
    localStorage.removeItem(storageKey);
    setTimeout(() => {
      location.replace(pathname); //location is web api
    }, 1500);
  }, [pathname]);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar  />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center px-6 justify-between">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <div>
            <Button id="logout" onClick={onLogout}>
              Log Out
            </Button>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AdminReport title="Total Employees" value={25} />
            <AdminReport title="Occupied Zones" value={12} />
            <AdminReport title="Available Slots" value={58} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
