import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const isAuthenticated = document.cookie
    .split("; ")
    .find((row) => row.startsWith("PeanutFundtoken="));

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
