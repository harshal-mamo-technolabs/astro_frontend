import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [loading, setLoading] = useState(true);  // New loading state
  const [error, setError] = useState(null);  // New error state

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      fetch(`/session-status?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setStatus(data.status);
          setCustomerEmail(data.customer_email);
          setLoading(false);  // Update loading state
        })
        .catch((err) => {
          console.error("Error fetching session status:", err);
          setError("Failed to fetch session status.");
          setLoading(false);  // Update loading state
        });
    } else {
      setError("No session ID found.");
      setLoading(false);  // Update loading state
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (status === 'open') {
    return <Navigate to="/checkout" />;
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.
          If you have any questions, please email <a href="orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return <p>Unknown status.</p>;
};

export default Return;
