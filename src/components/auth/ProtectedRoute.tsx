import { memo, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  isAllowed: boolean;
  redirectPath: string;
  children: ReactNode;
  data?: unknown;
   checkAllowed?: () => boolean;
}

const ProtectedRoute = ({
  isAllowed,
  redirectPath,
  children,
  
  data,
}: IProps) => {
  if (!isAllowed) return <Navigate to={redirectPath} replace state={data} />;
  return <>{children}</>;
};

export default memo(ProtectedRoute);
