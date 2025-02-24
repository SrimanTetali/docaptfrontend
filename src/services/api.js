import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Register Patient
export const registerPatient = async (patientData) => {
  try {
    console.log("this is the patient register data",patientData);
    const response = await axios.post(`${API_URL}/patient/register`, patientData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login Patient
export const loginPatient = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/patient/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Patient Profile
export const getPatientProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/patient/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update Patient Profile
export const updatePatientProfile = async (token, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/patient/profile`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get All Doctors
export const getAllDoctors = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/patient/doctors`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Book a Session
export const bookSession = async (token, bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/patient/book-session`, bookingData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Patient Bookings
export const getPatientBookings = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/patient/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Cancel Appointment
export const cancelAppointment = async (token, bookingId, reason) => {
  try {
    const response = await axios.put(`${API_URL}/patient/cancel/${bookingId}`, { reason }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// **Doctor APIs**

// Register Doctor
export const registerDoctor = async (doctorData) => {
    try {
      const response = await axios.post(`${API_URL}/doctor/register`, doctorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
  // Login Doctor
  export const loginDoctor = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/doctor/login`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
  // Get Doctor Profile
  export const getDoctorProfile = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/doctor/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
  // Update Doctor Profile
  export const updateDoctorProfile = async (token, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/doctor/profile`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
  // Get Doctor Bookings
  export const getDoctorBookings = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/doctor/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
  // Update Booking Status (Accept/Reject/Complete)
  export const updateBookingStatus = async (token, bookingId, status) => {
    try {
      const response = await axios.put(`${API_URL}/doctor/booking-status`, { bookingId, status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
  // Doctor Cancels Appointment
  export const cancelAppointmentByDoctor = async (token, bookingId, reason) => {
    try {
      const response = await axios.put(`${API_URL}/doctor/cancel-appointment/${bookingId}`, { reason }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };


// Register Admin
export const registerAdmin = async (adminData) => {
    try {
      const response = await axios.post(`${API_URL}/admin/register`, adminData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
  // Login Admin
  export const loginAdmin = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/admin/login`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
  // Get All Patients
  export const getAllPatients = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/admin/patients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  

// Get All Doctors
export const getDoctorsForAdmin = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/admin/doctors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
  // Get Doctor Bookings
  export const getDoctorBookings = async (token, doctorId) => {
    try {
      const response = await axios.get(`${API_URL}/admin/doctor-bookings/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
  // View Analytics
  export const viewAnalytics = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/admin/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
  // Register Doctor by Admin
  export const registerDoctorByAdmin = async (token, doctorData) => {
    try {
      const response = await axios.post(`${API_URL}/admin/register-doctor`, doctorData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
  // Cancel Appointment by Admin
  export const cancelAppointmentByAdmin = async (token, bookingId) => {
    try {
      const response = await axios.put(`${API_URL}/admin/cancel-appointment/${bookingId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  