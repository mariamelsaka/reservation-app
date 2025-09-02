import Button from "@components/Ui/Button";
import { IMAGES } from "@config/assets";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const { pathname } = useLocation();
  const storageKey = "loggedInUser";
//   const userDataString = localStorage.getItem(storageKey);
//   const userData = userDataString ? JSON.parse(userDataString) : null;
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
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center border-b">
          <img src={IMAGES.Logo} alt="logo" className="w-fit h-[80px]" />
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200">
            Dashboard
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200">
            users
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200">
            Zones
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200">
            rates
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200">
            rush hours
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200">
            vacations
          </button>
        </nav>
      </aside>

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
            {/* Example cards */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Total Employees</h3>
              <p className="text-3xl mt-2">25</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Occupied Zones</h3>
              <p className="text-3xl mt-2">12</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">Available Slots</h3>
              <p className="text-3xl mt-2">58</p>
            </div>
            {/* Add more cards or charts here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
