// Dashboard.jsx
const Dashboard = () => {
    return (
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-lg font-semibold">Total Appointments</h3>
            <p className="text-2xl">120</p>
          </div>
          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-lg font-semibold">Active Doctors</h3>
            <p className="text-2xl">15</p>
          </div>
          <div className="bg-white p-5 rounded shadow">
            <h3 className="text-lg font-semibold">Registered Patients</h3>
            <p className="text-2xl">500</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;