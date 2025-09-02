import { Link } from "react-router-dom";
import { IMAGES } from "@config/assets";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SidebarProps {
}

const Sidebar: React.FC<SidebarProps> = () => {
  // Read user from localStorage
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const role = userData?.user?.role; // "admin" or "gate"

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <div className="h-16 flex items-center justify-center border-b">
        <img src={IMAGES.Logo} alt="logo" className="w-fit h-[80px]" />
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {role === "admin" || role === "employee" && (
          <Link
            to="/admin-panel"
            className="block px-3 py-2 rounded hover:bg-gray-200"
          >
            Dashboard
          </Link>
        )}

         {/* {(!role || role !== "admin") && gateId && ( */}
          <>
            <Link
              to={`/gate/gate_1`}
              className="block px-3 py-2 rounded hover:bg-gray-200"
            >
              Gate
            </Link>
            <Link
              to={`/check-out-panel`}
              className="block px-3 py-2 rounded hover:bg-gray-200"
            >
              Check Out
            </Link>
          </>
        {/* )} */}
      </nav>
    </aside>
  );
};

export default Sidebar;
