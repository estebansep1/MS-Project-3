import express from 'express';
import cors from 'cors';
// import allRoutes from '../routes/public.js';


function createServers() {
    const app = express();
    app.use(express.static("dist/client"));
    app.use(cors());
    app.use(express.json());
    app.use(function (err, req, res, next) {
        if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
            res
                .status(400)
                .json(
                    "The server did not receive a valid JSON. Please try checking for syntax errors."
                );
        }
    });
    app.use(allRoutes);
    return app;
}   


export default createServers