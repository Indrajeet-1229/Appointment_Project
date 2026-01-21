const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointmentRoutes');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
dotenv.config();
require("./db")

const app = express();

app.use(cookieParser());

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/appointment', appointmentRoutes);



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../frontend/dist/index.html")
    );
  });
}




app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));