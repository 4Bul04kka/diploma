// src/api/profile.js

const API_BASE_URL = "http://server:3001/api"; // Replace with your actual API base URL

// Function to fetch client profile by ID
export const fetchClientProfile = async (clientId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile/client/${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Handle non-2xx responses
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch client profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching client profile:", error);
    throw error; // Re-throw the error for the component to handle
  }
};

// Function to fetch bank profile by ID
export const fetchBankProfile = async (bankId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile/bank/${bankId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Handle non-2xx responses
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch bank profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bank profile:", error);
    throw error; // Re-throw the error for the component to handle
  }
};

// TODO: Add other API functions related to profiles, listings, applications, etc.
