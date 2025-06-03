import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-xl font-bold">
              PeanutFund
            </NavLink>
            {isAuthenticated && (
              <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                  <NavLink 
                    to="/marketplace" 
                    className={({ isActive }) => 
                      `px-3 py-2 rounded-md text-sm font-medium ${
                        isActive ? 'bg-gray-800' : 'text-gray-300 hover:bg-gray-700'
                      }`
                    }
                  >
                    Marketplace
                  </NavLink>
                  <NavLink 
                    to="/my-bots" 
                    className={({ isActive }) => 
                      `px-3 py-2 rounded-md text-sm font-medium ${
                        isActive ? 'bg-gray-800' : 'text-gray-300 hover:bg-gray-700'
                      }`
                    }
                  >
                    My Bots
                  </NavLink>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            <NavLink 
              to="/help" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700"
            >
              Help
            </NavLink>
            
            {isAuthenticated ? (
              <>
                <NavLink 
                  to="/profile" 
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700"
                >
                  Profile
                </NavLink>
                <button
                  onClick={logout}
                  className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink 
                to="/login" 
                className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
