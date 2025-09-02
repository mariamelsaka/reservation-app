import Login from "@pages/Login";
import { lazy, Suspense } from "react";
import ErrorHandler from "@components/errors/ErrorHandler";
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
import CheckpointPage from "../pages/gate/checkpoint";
import Animate from "@components/Layout/Animate";

// user auth data -------------------
const storageKey = "loggedInUser";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;

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
              <Animate>
                <GatePage />
              </Animate>
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
                <Animate>
                  <AdminDashboard />
                </Animate>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="check-out-panel"
          element={
            <ProtectedRoute
              isAllowed={userData?.token}
              redirectPath="/login"
              data={userData}
            >
              <Suspense fallback={<LayOutSkeleton />}>
                <Animate>
                  <CheckpointPage />
                </Animate>
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
                <Animate>
                  <Login />
                </Animate>
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Route>
      {/* Catch all unmatched routes */}
      <Route
        path="*"
        element={
          <Suspense fallback={<AuthLayoutSkeleton />}>
            <ErrorHandler statusCode={404} title="Page Not Found" />
          </Suspense>
        }
      />
    </>
  )
);

export default router;
