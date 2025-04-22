import http from "http";

import config from "./src/constants/config.js";
import app from "./src/app.js";


const port = config.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Listening from port: ${port}`);
})