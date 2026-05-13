const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const app = express()

// MIDDLEWARE
app.use(cors())
app.use(express.json())

// ======================
// DATABASE CONNECTION
// ======================
const MONGO_URI = "mongodb://127.0.0.1:27017/crm_app"

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch((err) => console.log("Mongo Error:", err))

// ======================
// USER MODEL
// ======================
const UserSchema = new mongoose.Schema({
  email: String,
  password: String
})

const User = mongoose.model("User", UserSchema)

// ======================
// REGISTER
// ======================
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      email,
      password: hashedPassword
    })

    res.json({ message: "User registered successfully", user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ======================
// LOGIN
// ======================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.json({ message: "Wrong password" })
    }

    const token = jwt.sign(
      { id: user._id },
      "secret123",
      { expiresIn: "1h" }
    )

    res.json({
      message: "Login successful",
      token
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ======================
// DASHBOARD (PROTECTED)
// ======================
app.get("/api/dashboard", (req, res) => {
  res.json({
    message: "Welcome to Dashboard 🚀",
    status: "active"
  })
})

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.json({ message: "API RUNNING 🚀" })
})

// ======================
// START SERVER
// ======================
const PORT = 5000

app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
})  