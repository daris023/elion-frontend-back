import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import API from "./api"

// ================= LOGIN =================
function Login() {
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

        <p>
          S’ke account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}

// ================= REGISTER =================
function Register() {
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

        <p>
          Ke account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  )
}

// ================= DASHBOARD =================
function Dashboard() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Dashboard 🚀</h1>
        <p>You are logged in</p>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

// ================= APP ROUTER =================
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}


// ================= SIMPLE UI =================
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    fontFamily: "Arial",
    color: "white"
  },
  card: {
    padding: 30,
    background: "#1e293b",
    borderRadius: 12,
    width: 300,
    textAlign: "center"
  }
}