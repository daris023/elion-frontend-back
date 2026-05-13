import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const register = async () => {
    await fetch(`${API}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    alert("Account created")
    navigate("/")
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Register</h1>

        <input placeholder="email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />

        <button onClick={register}>Register</button>
        <p onClick={() => navigate("/")}>Login</p>
      </div>
    </div>
  )
}

const styles = {
  container: { height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" },
  card: { padding:30, background:"#1e293b", color:"white", borderRadius:10 }
}