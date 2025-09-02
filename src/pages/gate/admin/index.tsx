import { useEffect, useState, useCallback } from "react";
import AdminReport from "@components/AdminReports";
import Sidebar from "@components/Layout/SideBar";
import Button from "@components/Ui/Button";
import { useLocation } from "react-router-dom";
import AxiosInstance from "@config/axios.config";
import { Zone } from "interfaces";

interface AdminStats {
  totalGates: number;
  occupiedZones: number;
  availableSlots: number;
  totalCategories: number;
}

const AdminDashboard = () => {
  const { pathname } = useLocation();
  const storageKey = "loggedInUser";

  const [stats, setStats] = useState<AdminStats>({
    totalGates: 0,
    occupiedZones: 0,
    availableSlots: 0,
    totalCategories: 0,
  });

  const fetchStats = useCallback(async () => {
    try {
      // Fetch zones, categories, and gates in parallel
      const [zonesRes, categoriesRes, gatesRes] = await Promise.all([
        AxiosInstance.get<Zone[]>("master/zones"),
        AxiosInstance.get("master/categories"),
        AxiosInstance.get("master/gates"),
      ]);

      const zones = zonesRes.data;
      const categories = categoriesRes.data;
      const gates = gatesRes.data;

      // Compute stats
      const occupied = zones.filter((z) => z.occupied > 0).length;
      const available = zones.reduce((acc, z) => acc + z.free, 0);


      setStats({
        totalGates: gates.length,
        occupiedZones: occupied,
        availableSlots: available,
        totalCategories: categories.length,
      });
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // logout
  const onLogout = useCallback(() => {
    localStorage.removeItem(storageKey);
    setTimeout(() => {
      location.replace(pathname);
    }, 1500);
  }, [pathname]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AdminReport title="Total Gates" value={stats.totalGates} />
            <AdminReport title="Occupied Zones" value={stats.occupiedZones} />
            <AdminReport title="Available Slots" value={stats.availableSlots} />
            <AdminReport title="Categories" value={stats.totalCategories} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
