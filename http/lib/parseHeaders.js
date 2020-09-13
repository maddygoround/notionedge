'use strict'

/**
 * Lightweight web framework for your serverless applications
 * @author Mahendra Rathod <rathodm63@gmail.com>
 * @license MIT
 */


module.exports = event => {
    let headers = Object.keys(event.request.headers).reduce((headers, key ) => {
        headers[event.request.headers[key][0].key.toLowerCase()] = event.request.headers[key][0].value;
        return headers;
    }, {});

    //headers['x-request-id'] = crypto.randomBytes(30).toString('base64')

    return headers;
}