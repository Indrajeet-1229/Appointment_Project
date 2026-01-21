import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { UserCircle } from 'lucide-react';

const Header = ({ title = "Dashboard" }) => {
  const { handleLogout, isAuth } = useContext(AuthContext);
  const userName = isAuth?.user?.name || "User";

  return (
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-3xl font-bold text-emerald-600">{title}</h1>

      <div className="flex items-center gap-4">
        {/* User Info */}
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <UserCircle size={28} className="text-emerald-600" />
          <span>{userName}</span>
        </div>

        {/* Logout */}
        <Link
          onClick={handleLogout}
          to="/login"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Header;
