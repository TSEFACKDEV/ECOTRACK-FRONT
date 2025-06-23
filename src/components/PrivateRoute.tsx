import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  roles?: ('ADMIN' | 'CITOYEN')[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user?.role as 'ADMIN' | 'CITOYEN')) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;