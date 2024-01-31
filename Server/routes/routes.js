const express = require("express");
const router = express.Router();

import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../../client/App";

router.get("*", (req, res) => {
    const content = ReactDOMServer.renderToString(<App currentPath={req.path} />);

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <p>stuff goes here</p>
    </body>
    </html>
    `; 
    res.send(html);
});

module.exports = router;