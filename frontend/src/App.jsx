import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import BotDetailPage from "./pages/BotDetailPage";
import BotListPage from "./pages/BotListPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "/index.css";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage></DashboardPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/bots/:botId"
            element={
              <ProtectedRoute>
                <BotDetailPage></BotDetailPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/bots"
            element={
              <ProtectedRoute>
                <BotListPage></BotListPage>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage></ProfilePage>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage></NotFoundPage>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
