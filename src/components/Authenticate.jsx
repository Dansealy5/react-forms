import { useState } from "react";

export default function Authenticate({ token }) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
  
    async function handleClick() {
      try {
        const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
        })
        if (!response.ok) {
            throw new Error(`Authentication failed, please try again`);
        }
        const result = await response.json()
        setSuccessMessage(result.message)
        setError(null)
        
      } catch (error) {
        setError(error.message);
      }
    }
    return (
        <div>
            <h2>Authenticate</h2>
            {successMessage && <p className="successcolor">{successMessage}</p>}
            {error && <p className="errorcolor">{error}</p>}
            <button onClick={handleClick}>Authenticate Token!</button>
        </div>
      );
  }