'use strict'

/**
 * Lightweight web framework for your serverless applications
 * @author Mahendra Rathod <rathodm63@gmail.com>
 * @license MIT
 */

const requestHeaders = require('./parseHeaders');
const requestBody = require('./parseBody');
const querystring = require("querystring");

module.exports = event => {
    const method = event.request.method;
    const remoteAddress = event.request.clientIp;
    const httpMethod = event.request.method;
    const headers = requestHeaders(event);
    const body = requestBody(event);
    const resource = event.request.uri;
    const path = resource;
    const requestContext = {
        identity: {
            sourceIp: event.request.clientIp
        }
    }
    const isBase64Encoded = event.request.body ? event.request.body.encoding === 'base64' ? true : false : false;
    const queryStringParameters = querystring.parse(event.request.querystring.toLowerCase());

    return {
        method,
        remoteAddress,
        headers,
        body,
        path,
        httpMethod,
        requestContext,
        isBase64Encoded,
        queryStringParameters
    }
}