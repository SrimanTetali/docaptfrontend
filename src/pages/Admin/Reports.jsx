// Reports.jsx
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [expandedSections, setExpandedSections] = useState([true, false, false, false, false]);
  const [doctors, setDoctors] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchDoctors();
    fetchBookings();
  }, []);

  const fetchDoctors = async () => {
    const response = await fetch('http://localhost:5000/api/doctorsdata');
    const data = await response.json();
    setDoctors(data);
  };

  const fetchBookings = async () => {
    const response = await fetch('http://localhost:5000/api/bookingsdata');
    const data = await response.json();
    setBookings(data);
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

  // Dynamic Y-axis scale function
  const getYScale = (maxValue) => {
    if (maxValue <= 20) return { stepSize: 5, max: Math.ceil(maxValue / 5) * 5 };
    if (maxValue <= 100) return { stepSize: 10, max: Math.ceil(maxValue / 10) * 10 };
    return { stepSize: 50, max: Math.ceil(maxValue / 50) * 50 };
  };

  const chartOptions = (maxValue) => {
    const scale = getYScale(maxValue);
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
        datalabels: {
          display: true,
          color: '#fff',
          font: { weight: 'bold' },
          anchor: 'end',
          align: 'top',
          formatter: (value) => value || ''
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: scale.max,
          ticks: { stepSize: scale.stepSize },
          grid: { color: 'rgba(0,0,0,0.05)' }
        },
        x: { grid: { display: false } }
      }
    };
  };

  // Defined 9 specializations
  const specializations = [
    'Cardiologist', 'Dermatologist', 'Pediatrician', 'Neurologist', 
    'Orthopedist', 'Ophthalmologist', 'Endocrinologist', 'Gynecologist', 
    'General Physician'
  ];

  // 1. Bookings by Specialization
  const specializationData = {
    labels: specializations,
    datasets: [{
      data: specializations.map(spec => 
        bookings.filter(b => {
          const doctor = doctors.find(d => d._id === b.doctorId);
          return doctor?.specialization === spec && 
            new Date(b.date).getMonth() + 1 === selectedMonth &&
            new Date(b.date).getFullYear() === selectedYear;
        }).length),
      backgroundColor: '#3b82f6',
      borderColor: '#2563eb',
      borderWidth: 1
    }]
  };
  const specMax = Math.max(...specializationData.datasets[0].data);

  // 2. Bookings by Status
  const statusData = {
    labels: ['Pending', 'Accepted', 'Rejected', 'Completed', 'Cancelled'],
    datasets: [{
      data: [
        bookings.filter(b => b.status === 'Pending' && new Date(b.date).getMonth() + 1 === selectedMonth && new Date(b.date).getFullYear() === selectedYear).length,
        bookings.filter(b => b.status === 'Accepted' && new Date(b.date).getMonth() + 1 === selectedMonth && new Date(b.date).getFullYear() === selectedYear).length,
        bookings.filter(b => b.status === 'Rejected' && new Date(b.date).getMonth() + 1 === selectedMonth && new Date(b.date).getFullYear() === selectedYear).length,
        bookings.filter(b => b.status === 'Completed' && new Date(b.date).getMonth() + 1 === selectedMonth && new Date(b.date).getFullYear() === selectedYear).length,
        bookings.filter(b => b.status === 'Cancelled' && new Date(b.date).getMonth() + 1 === selectedMonth && new Date(b.date).getFullYear() === selectedYear).length
      ],
      backgroundColor: '#3b82f6',
      borderColor: '#2563eb',
      borderWidth: 1
    }]
  };
  const statusMax = Math.max(...statusData.datasets[0].data);

  // 3. Yearly Bookings
  const yearlyData = {
    labels: months.map(m => new Date(0, m - 1).toLocaleString('default', { month: 'short' })),
    datasets: [{
      data: months.map(m => 
        bookings.filter(b => 
          new Date(b.date).getMonth() + 1 === m && 
          new Date(b.date).getFullYear() === selectedYear
        ).length),
      backgroundColor: '#3b82f6',
      borderColor: '#2563eb',
      borderWidth: 1
    }]
  };
  const yearlyMax = Math.max(...yearlyData.datasets[0].data);

  // 4. Doctor Performance
  const getDoctorPerformance = () => {
    return doctors
      .filter(doc => !specializationFilter || doc.specialization === specializationFilter)
      .map(doc => ({
        name: doc.name,
        total: bookings.filter(b => 
          b.doctorId === doc._id && 
          new Date(b.date).getMonth() + 1 === selectedMonth &&
          new Date(b.date).getFullYear() === selectedYear
        ).length,
        completed: bookings.filter(b => 
          b.doctorId === doc._id && 
          b.status === 'Completed' &&
          new Date(b.date).getMonth() + 1 === selectedMonth &&
          new Date(b.date).getFullYear() === selectedYear
        ).length,
        cancelled: bookings.filter(b => 
          b.doctorId === doc._id && 
          b.status === 'Cancelled' &&
          new Date(b.date).getMonth() + 1 === selectedMonth &&
          new Date(b.date).getFullYear() === selectedYear
        ).length
      }));
  };

  // 5. Cancellation Report
  const getCancellationData = () => {
    return months.map(m => ({
      month: new Date(0, m - 1).toLocaleString('default', { month: 'short' }),
      patientCancelled: bookings.filter(b => 
        b.cancelledBy === 'patient' && 
        new Date(b.date).getMonth() + 1 === m &&
        new Date(b.date).getFullYear() === selectedYear
      ).length,
      doctorCancelled: bookings.filter(b => 
        b.cancelledBy === 'doctor' && 
        new Date(b.date).getMonth() + 1 === m &&
        new Date(b.date).getFullYear() === selectedYear
      ).length
    }));
  };

  const toggleSection = (index) => {
    setExpandedSections(prev => 
      prev.map((expanded, i) => (i === index ? !expanded : expanded))
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports Dashboard</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {months.map(m => (
              <option key={m} value={m}>
                {new Date(0, m - 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {/* Report Sections */}
      <div className="space-y-6">
        {/* 1. Specializations */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button 
            onClick={() => toggleSection(0)}
            className="w-full p-4 flex justify-between items-center text-left bg-gray-50 hover:bg-gray-100"
          >
            <h2 className="text-lg font-semibold text-gray-800">Bookings by Specialization</h2>
            <span className="text-gray-500">{expandedSections[0] ? '▲' : '▼'}</span>
          </button>
          {expandedSections[0] && (
            <div className="p-4 h-80">
              <Bar data={specializationData} options={chartOptions(specMax)} plugins={[require('chartjs-plugin-datalabels')]} />
            </div>
          )}
        </div>

        {/* 2. Status */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button 
            onClick={() => toggleSection(1)}
            className="w-full p-4 flex justify-between items-center text-left bg-gray-50 hover:bg-gray-100"
          >
            <h2 className="text-lg font-semibold text-gray-800">Bookings by Status</h2>
            <span className="text-gray-500">{expandedSections[1] ? '▲' : '▼'}</span>
          </button>
          {expandedSections[1] && (
            <div className="p-4 h-80">
              <Bar data={statusData} options={chartOptions(statusMax)} plugins={[require('chartjs-plugin-datalabels')]} />
            </div>
          )}
        </div>

        {/* 3. Yearly Trend */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button 
            onClick={() => toggleSection(2)}
            className="w-full p-4 flex justify-between items-center text-left bg-gray-50 hover:bg-gray-100"
          >
            <h2 className="text-lg font-semibold text-gray-800">Yearly Booking Trend</h2>
            <span className="text-gray-500">{expandedSections[2] ? '▲' : '▼'}</span>
          </button>
          {expandedSections[2] && (
            <div className="p-4 h-80">
              <Bar data={yearlyData} options={chartOptions(yearlyMax)} plugins={[require('chartjs-plugin-datalabels')]} />
            </div>
          )}
        </div>

        {/* 4. Doctor Performance */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button 
            onClick={() => toggleSection(3)}
            className="w-full p-4 flex justify-between items-center text-left bg-gray-50 hover:bg-gray-100"
          >
            <h2 className="text-lg font-semibold text-gray-800">Doctor Performance</h2>
            <span className="text-gray-500">{expandedSections[3] ? '▲' : '▼'}</span>
          </button>
          {expandedSections[3] && (
            <div className="p-4">
              <select
                value={specializationFilter}
                onChange={(e) => setSpecializationFilter(e.target.value)}
                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Specializations</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-gray-600">Doctor</th>
                      <th className="px-4 py-2 text-gray-600">Total</th>
                      <th className="px-4 py-2 text-gray-600">Completed</th>
                      <th className="px-4 py-2 text-gray-600">Cancelled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDoctorPerformance().map((doc, idx) => (
                      <tr key={idx} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">{doc.name}</td>
                        <td className="px-4 py-2 text-center">{doc.total}</td>
                        <td className="px-4 py-2 text-center">{doc.completed}</td>
                        <td className="px-4 py-2 text-center">{doc.cancelled}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* 5. Cancellations */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button 
            onClick={() => toggleSection(4)}
            className="w-full p-4 flex justify-between items-center text-left bg-gray-50 hover:bg-gray-100"
          >
            <h2 className="text-lg font-semibold text-gray-800">Cancellation Report</h2>
            <span className="text-gray-500">{expandedSections[4] ? '▲' : '▼'}</span>
          </button>
          {expandedSections[4] && (
            <div className="p-4">
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-gray-600">Month</th>
                      <th className="px-4 py-2 text-gray-600">Patient Cancelled</th>
                      <th className="px-4 py-2 text-gray-600">Doctor Cancelled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCancellationData().map((data, idx) => (
                      <tr key={idx} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">{data.month}</td>
                        <td className="px-4 py-2 text-center">{data.patientCancelled}</td>
                        <td className="px-4 py-2 text-center">{data.doctorCancelled}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;