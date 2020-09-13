'use strict'

/**
 * Lightweight web framework for your serverless applications
 * @author Mahendra Rathod <rathodm63@gmail.com>
 * @license MIT
 */


module.exports = event => {
    const type = typeof event.request.body;

    if (type === 'undefined') {
        return {};
    }

    if (Buffer.isBuffer(event.request.body.data)) {
        return event.request.body.data;
    } else if (type === 'string') {
        return Buffer.from(event.request.body.data, event.request.body.encoding === 'base64' ? 'base64' : 'utf8');
    } else if (type === 'object') {
        return Buffer.from(JSON.stringify(event.request.body.data));
    }

    throw new Error(`Unexpected event.body type: ${typeof event.request.body.data}`);
}