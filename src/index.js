import "dotenv/config";
import app from "./app.js";
import connectDB from "./database/index.js";

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("Error:", error);
      throw error;
    });

    app.listen(port, () => {
      console.log(`✅ Server app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect MongoDB:", error);
  });
