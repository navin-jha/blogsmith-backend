import "dotenv/config";
import app from "./app.js";

const port = process.env.PORT || 3000;

app.on("error", (error) => {
    console.error("Error:", error);
    throw error;
});

app.listen(port, () => {
    console.log(`✅ Server app listening on port ${port}`);
});
