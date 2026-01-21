const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI.replace("<DB_PASSWORD>", process.env.DATABASE_PASSWORD)).then(() => {
    console.log("✅ MongoDB Connected");

}).catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
});