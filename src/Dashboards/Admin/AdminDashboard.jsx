import DoctorIcon from '../../images/Admin/DoctorIcon.png';
import AppointmentIcon from '../../images/Admin/Appointment.png';
import PatientIcon from '../../images/Admin/PatientIcon.png';
import Doctor from '../../images/doctors/Doc1Rechard.jpg';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white flex items-center p-5 rounded-lg shadow-md">
          <img src={DoctorIcon} alt="Doctors" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-3xl font-bold">15</p>
            <p className="text-gray-600">Doctors</p>
          </div>
        </div>
        <div className="bg-white flex items-center p-5 rounded-lg shadow-md">
          <img src={AppointmentIcon} alt="Appointments" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-3xl font-bold">6</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>
        <div className="bg-white flex items-center p-5 rounded-lg shadow-md">
          <img src={PatientIcon} alt="Patients" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-3xl font-bold">3</p>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <span className="mr-2">📋</span> Latest Bookings
        </h3>
        <ul>
          {[
            { name: 'Dr. Richard James', date: '5 Oct 2024', status: 'Cancelled' },
            { name: 'Dr. Richard James', date: '26 Sep 2024', status: 'Cancelled' },
            { name: 'Dr. Christopher Davis', date: '23 Sep 2024', status: 'Completed' },
            { name: 'Dr. Richard James', date: '25 Sep 2024', status: 'Completed' },
            { name: 'Dr. Richard James', date: '23 Sep 2024', status: 'Completed' },
          ].map((booking, index) => (
            <li key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div className="flex items-center">
                <img src={Doctor} alt="Doctor" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="font-semibold">{booking.name}</p>
                  <p className="text-gray-500 text-sm">Booking on {booking.date}</p>
                </div>
              </div>
              <p className={`text-sm font-semibold ${booking.status === 'Cancelled' ? 'text-red-500' : 'text-green-500'}`}>
                {booking.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
