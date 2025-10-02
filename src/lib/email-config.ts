// Backend API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://web-restaurant-backend-rexh.onrender.com';

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  specialRequests: string;
}

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Submit reservation to backend API
export const submitReservation = async (formData: ReservationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting reservation:', error);
    throw error;
  }
};

// Submit contact form to backend API
export const submitContact = async (formData: ContactData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// Check backend health
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Backend health check failed:', error);
    return { status: 'ERROR', message: 'Backend not available' };
  }
};

