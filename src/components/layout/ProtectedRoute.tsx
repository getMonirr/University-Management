import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector(selectCurrentToken);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
