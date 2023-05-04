import { PropsWithChildren, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedProps {
  mode: "loggedInOnly" | "loggedOutOnly";
}

function Protected({ mode }: ProtectedProps) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const { checkRefreshTokenInStorage } = useAuth();

  useEffect(() => {
    setIsAuth(checkRefreshTokenInStorage());
    setLoading(false);
  }, []);

  if (!loading) {
    if (mode === "loggedInOnly") {
      if (isAuth) {
        return <Outlet />;
      } else {
        return <Navigate to="/login" replace />;
      }
    }

    if (mode === "loggedOutOnly") {
      if (!isAuth) {
        return <Outlet />;
      } else {
        return <Navigate to="/" replace />;
      }
    }
  }
  return null;
}

export default Protected;
