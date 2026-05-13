import { useNavigate } from "react-router-dom"

export default function Dashboard() {
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

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "white"
  },
  card: {
    padding: 40,
    background: "#1e293b",
    borderRadius: 12
  }
}