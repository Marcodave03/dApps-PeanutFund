import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme, themeColors, ThemeName } from '../contexts/ThemeContext';

const themeOptions = Object.keys(themeColors) as ThemeName[];

const Navigation: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, setTheme, colors } = useTheme();

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as ThemeName);
  };

  return (
    <nav className={`${colors.bg} ${colors.text}`}>
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
                    className={({ isActive }: { isActive: boolean }) =>
                      `px-3 py-2 rounded-md text-sm font-medium ${
                        isActive ? colors.border : `${colors.muted} ${colors.hover}`
                      }`
                    }
                  >
                    Marketplace
                  </NavLink>
                  <NavLink 
                    to="/my-bots" 
                    className={({ isActive }: { isActive: boolean }) =>
                      `px-3 py-2 rounded-md text-sm font-medium ${
                        isActive ? colors.border : `${colors.muted} ${colors.hover}`
                      }`
                    }
                  >
                    My Bots
                  </NavLink>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Dropdown Theme Toggle */}
            <select
              value={theme}
              onChange={handleThemeChange}
              className={`text-sm px-2 py-1 ${colors.border} ${colors.text} ${colors.hover} bg-transparent`}
            >
              {themeOptions.map((opt) => (
                <option key={opt} value={opt} className="text-black">
                  {opt.replace('Theme', '')}
                </option>
              ))}
            </select>

            <NavLink 
              to="/help" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${colors.muted} ${colors.hover}`}
            >
              Help
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink 
                  to="/profile" 
                  className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${colors.muted} ${colors.hover}`}
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
};

export default Navigation;
