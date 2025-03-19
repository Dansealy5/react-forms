import { useState } from "react";

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault();

        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            return;
        }

        setPasswordError(null)

        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                body: JSON.stringify({username, password}),
            })
            const result = await response.json()
            setToken(result.token)
            
        } catch (error) {
            setError(error.message);
        }
    }
return ( 
    <>
    <h2>Sign Up!</h2>
    {error && <p>{error}</p>}
    {passwordError && <p style={{color: 'red'}}>{passwordError}</p>}

    <form onSubmit={handleSubmit}>
      <label>
        Username: <input value={username} onChange={(e) => setUsername(e.target.value)}/>
      </label>
      <label>
        Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <button>Submit</button>
    </form>
    </>
 )
}