const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to enable CORS
app.use(
  cors({
    origin: true, // Allow requests from any origin
    credentials: true, // Allow sending cookies with cross-origin requests
  })
);

// Route to set a cookie
app.post("/set-cookie", (req, res) => {
  console.log("called");
  // Set a cookie named 'myCookie' with value 'hello world'
  res.cookie("myCookie", "hello world", {
    maxAge: 900000, // Expires after 15 minutes
    httpOnly: true, // Cookie accessible only through HTTP(S)
    sameSite: "None", // Allows cross-site requests
    secure: true, // Requires HTTPS connection
  });

  res.send("Cookie set successfully");
});

// Route to retrieve the value of the cookie
app.get("/get-cookie", (req, res) => {
  // Retrieve the value of the 'myCookie' cookie from the parsed cookies
  const cookieValue = req.cookies["myCookie"];

  if (cookieValue) {
    res.send(`Value of 'myCookie': ${cookieValue}`);
  } else {
    res.send("Cookie not found");
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
