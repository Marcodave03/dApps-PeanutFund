import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "/index.css";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage></ChatPage>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
