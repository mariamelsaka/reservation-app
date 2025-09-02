import { Outlet, useLocation } from "react-router-dom";
// import NavBar from "../components/Layout/NavBar/NavBar";
// import Footer from "../components/Layout/Footer/Footer";
import { memo, useRef, useEffect, useState } from "react";
// import { memo, useRef, useEffect, useState, lazy, Suspense } from "react";
// import NavbarSkeleton from "./Layout/Skeleton/NavbarSkeleton";
// import FooterSkeleton from "./Layout/Skeleton/FooterSkeleton";
// lazy load components -------------------------------------
// const NavBar = lazy(() => import("@components/Layout/NavBar/NavBar"));
// const Footer = lazy(() => import("@components/Layout/Footer/Footer"));

// lazy load components -------------------------------------
const Layout = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      prevPathRef.current = location.pathname;
      setKey(location.pathname);
    }
    // else: do not update the key → no remount
  }, [location.pathname]);
  return (
    <>
      {/* <Suspense fallback={<NavbarSkeleton />}>
        <NavBar />
      </Suspense> */}
      <div key={key}>
        <Outlet />
      </div>
      {/* <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense> */}
    </>
  );
};

export default memo(Layout);
