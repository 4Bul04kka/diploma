import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming react-router-dom v6+
import './clientprofile.css';

// Removed Mock Client Profile Data
// const mockClientProfile = { ... };

const ClientProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        // TODO: Replace with actual token retrieval logic (e.g., from localStorage or context)
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

        if (!token) {
          setError("Authentication token not found.");
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/profiles/client/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Client profile not found.");
          } else if (response.status === 401) {
            throw new Error("Unauthorized: Please log in.");
          } else {
            throw new Error(`Error fetching client profile: ${response.statusText}`);
          }
        }

        const data = await response.json();
        setProfile(data.data); // Assuming the profile data is in a 'data' field
        setLoading(false);

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClientProfile();
  }, [id]); // Re-run effect if id changes

  if (loading) {
    return <div className="client-profile-page">Loading client profile...</div>;
  }

  if (error) {
    return <div className="client-profile-page">Error: {error}</div>;
  }

  // Display the profile data
  return (
    <div className="client-profile-page">
      <h2>Client Profile</h2>
      {profile ? (
        <div>
          <p><strong>ID:</strong> {profile.id}</p>
          <p><strong>Full Name:</strong> {profile.full_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Company Name:</strong> {profile.company_name}</p>
          <p><strong>INN:</strong> {profile.inn}</p>
          <p><strong>KPP:</strong> {profile.kpp}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Financial Info:</strong> {profile.financial_info}</p>
          <h3>Listings</h3>
          {profile.listings && profile.listings.length > 0 ? (
            <ul>
              {profile.listings.map(listing => (
                <li key={listing.id}>
                  Listing ID: {listing.id}, Title: {listing.title}, Status: {listing.status}
                </li>
              ))}
            </ul>
          ) : (
            <p>No listings found.</p>
          )}
        </div>
      ) : (
        <p>No client profile data available.</p>
      )}
    </div>
  );
};

export default ClientProfile;
