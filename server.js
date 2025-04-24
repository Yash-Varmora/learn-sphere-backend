import http from "http";

import config from "./src/constants/config.js";
import app from "./src/app.js";
import { connectDB } from "./src/configs/prisma.config.js";


const port = config.PORT || 5000;
(async () => {
    try {
        
    
    await connectDB()
    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`Listening from port: ${port}`);
    })
    } catch (error) {
        console.log(`Server Failed to Start!`, error)
    }
})()