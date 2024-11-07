import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Upload, Search, LogIn } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const location = useLocation();
  
  const links = [
    { to: '/', label: 'ホーム', icon: BookOpen },
    { to: '/upload', label: 'アップロード', icon: Upload },
    { to: '/search', label: '検索', icon: Search },
    { to: '/login', label: 'ログイン', icon: LogIn },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">過去問DB</span>
          </Link>
          
          <div className="flex space-x-4">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === to
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}