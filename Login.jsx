import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const login = async () => {
    const res = await fetch(`${API}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (data.token) {
      localStorage.setItem("token", data.token)
      navigate("/dashboard")
    } else {
      alert(data.message)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Login</h1>

        <input placeholder="email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />

        <button onClick={login}>Login</button>
        <p onClick={() => navigate("/register")}>Create account</p>
      </div>
    </div>
  )
}

const styles = {
  container: { height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" },
  card: { padding:30, background:"#1e293b", color:"white", borderRadius:10 }
}