require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Import and use routes
const authRoutes = require("./routes/auth");
// const drugRoutes = require("./routes/drug");

app.use("/api/auth", authRoutes);
// app.use("/api/drug", drugRoutes);

// Debug route to see all registered routes
app.get("/debug-routes", (req, res) => {
  const routes = [];
  
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods)
      });
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push({
            path: handler.route.path,
            methods: Object.keys(handler.route.methods)
          });
        }
      });
    }
  });
  
  res.json({ routes });
});

// Test route
app.get("/", (req, res) => {
  res.json({ 
    message: "API Server is running!",
    endpoints: {
      signup: "POST /api/auth/signup",
      login: "POST /api/auth/login",
      debug: "GET /debug-routes"
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 Signup URL: http://localhost:${PORT}/api/auth/signup`);
});