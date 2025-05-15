import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Assuming react-router-dom v6+
import { fetchBankProfile } from "../../api/profile"; // Import the API function
import "./bankprofile.css";

const BankProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBankProfile = async () => {
      try {
        // TODO: Replace with actual token retrieval logic (e.g., from localStorage or context)
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

        if (!token) {
          setError("Authentication token not found.");
          setLoading(false);
          return;
        }

        // Use the imported API function
        const data = await fetchBankProfile(id, token);

        // Assuming the API function returns the profile data directly now
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getBankProfile();
  }, [id]); // Re-run effect if id changes

  if (loading) {
    return <div className='bank-profile-page'>Loading bank profile...</div>;
  }

  if (error) {
    return <div className='bank-profile-page'>Error: {error}</div>;
  }

  // Display the profile data
  return (
    <div className='bank-profile-page'>
      <h2>Bank Profile</h2>
      {profile ? (
        <div>
          <p>
            <strong>ID:</strong> {profile.id}
          </p>
          <p>
            <strong>ФИО:</strong> {profile.full_name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Банк:</strong> {profile.bank_branch}
          </p>
          <h3>Applications</h3>
          {profile.applications && profile.applications.length > 0 ? (
            <ul>
              {profile.applications.map((application) => (
                <li key={application.id}>
                  Application ID: {application.id}, Status: {application.status}
                  , Sent At: {application.sent_at}
                </li>
              ))}
            </ul>
          ) : (
            <p>No applications found.</p>
          )}
        </div>
      ) : (
        <p>No bank profile data available.</p>
      )}
    </div>
  );
};

export default BankProfile;
