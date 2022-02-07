const express = require('express');
const auth = require('../routes/auth');
const user = require('../routes/user');
const { JsonResponse } = require("../lib/apiResponse");

module.exports = function (app) {
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb'}));
    app.use("/api/v1/auth", auth);
    app.use("/api/v1/user", user);

    app.use((req, res, next) => {
        return JsonResponse(res, 404, "API endpoint not found")
    })
}