// Admin.js
import { Link, Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white shadow-lg p-5">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">Golden Life</h1>
        <nav className="space-y-4">
          <Link to="/admindashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/appointments" className="block text-gray-700 hover:text-blue-600">Appointments</Link>
          <Link to="/add-doctor" className="block text-gray-700 hover:text-blue-600">Add Doctor</Link>
          <Link to="/doctor-list" className="block text-gray-700 hover:text-blue-600">Doctors List</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 overflow-y-auto">
        {/* Logout Button */}
        <div className="flex justify-end">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>

        {/* Render nested components here */}
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;