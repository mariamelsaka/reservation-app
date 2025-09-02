import Login from "@pages/Login";
import PageNotFound from "@pages/PageNotFound";
import { lazy, Suspense } from "react";
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AdminDashboard from "@pages/gate/admin";
import ProtectedRoute from "@components/auth/ProtectedRoute";
import AuthLayoutSkeleton from "@components/Layout/Skeleton/AuthLayoutSkeleton";
import LayOutSkeleton from "@components/Layout/Skeleton/LayOutSkeleton";
// import GatePage from "../pages/gate/gateId";

// user auth data -------------------
const storageKey = "loggedInUser";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;
console.log(userData);
// user auth data -------------------
// lazy load components -------------------------------------

const GatePage = lazy(() => import("../pages/gate/gateId"));

// lazy load components -------------------------------------
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    {/* Root Layout */}
      <Route path="/" element={<Outlet />}>

   
        <Route
          path="gate/:gateId"
          element={
            <Suspense fallback={<LayOutSkeleton />}>
              <GatePage   />
            </Suspense>
          }
        />
        <Route
          path="admin-panel"
          element={
            <ProtectedRoute
              isAllowed={userData?.token}
              redirectPath="/login"
              data={userData}
            >
              <Suspense fallback={<LayOutSkeleton />}>
                <AdminDashboard />
              </Suspense>

            </ProtectedRoute>
          }
        />

        <Route
          path="login"
          element={
            <ProtectedRoute
              isAllowed={!userData?.jwt}
              redirectPath="/admin-panel"
              data={userData}
            >
              <Suspense fallback={<AuthLayoutSkeleton />}>
                <Login />
              </Suspense>

            </ProtectedRoute>
          }
        />
      </Route>
      {/* Page Not Found */}
      <Route path="*" element={
        <Suspense fallback={<AuthLayoutSkeleton />}>
          <PageNotFound />
        </Suspense>
       } />
      </>
  )
);

export default router;
