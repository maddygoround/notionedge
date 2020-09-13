"use strict";
const api = require('./http')({ provider: "awsEdge" });
const manifest = require("./manifest.json");
const { apis: { endpoints } } = manifest;


for (const route in endpoints) {
    const { file, middlewares } = endpoints[route];
    const middlewaresRequired = (middlewares && middlewares.length > 0) ? middlewares.map((middleware) => {
        return require(`./${middleware}`)
    }) : [];
    api.any(route, ...middlewaresRequired, require(`./${file}`));
}


exports.handler = async (event, context, callback) => {
    return await api.run(event, context, callback);
};
