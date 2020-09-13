'use strict'

/**
 * Lightweight web framework for your serverless applications
 * @author Mahendra Rathod <rathodm63@gmail.com>
 * @license MIT
 */

const { STATUS_CODES} = require('http');
const BINARY_ENCODINGS = ['gzip', 'deflate', 'br'];
const BINARY_CONTENT_TYPES = (process.env.BINARY_CONTENT_TYPES || '').split(',');
const setCookieVariations = ["set-cookie","Set-cookie","sEt-cookie","SEt-cookie","seT-cookie","SeT-cookie","sET-cookie","SET-cookie","set-Cookie","Set-Cookie","sEt-Cookie","SEt-Cookie","seT-Cookie","SeT-Cookie","sET-Cookie","SET-Cookie","set-cOokie","Set-cOokie","sEt-cOokie","SEt-cOokie","seT-cOokie","SeT-cOokie","sET-cOokie","SET-cOokie","set-COokie","Set-COokie","sEt-COokie","SEt-COokie","seT-COokie","SeT-COokie","sET-COokie","SET-COokie","set-coOkie","Set-coOkie","sEt-coOkie","SEt-coOkie","seT-coOkie","SeT-coOkie","sET-coOkie","SET-coOkie","set-CoOkie","Set-CoOkie","sEt-CoOkie","SEt-CoOkie","seT-CoOkie","SeT-CoOkie","sET-CoOkie","SET-CoOkie","set-cOOkie","Set-cOOkie","sEt-cOOkie","SEt-cOOkie","seT-cOOkie","SeT-cOOkie","sET-cOOkie","SET-cOOkie","set-COOkie","Set-COOkie","sEt-COOkie","SEt-COOkie","seT-COOkie","SeT-COOkie","sET-COOkie","SET-COOkie","set-cooKie","Set-cooKie","sEt-cooKie","SEt-cooKie","seT-cooKie","SeT-cooKie","sET-cooKie","SET-cooKie","set-CooKie","Set-CooKie","sEt-CooKie","SEt-CooKie","seT-CooKie","SeT-CooKie","sET-CooKie","SET-CooKie","set-cOoKie","Set-cOoKie","sEt-cOoKie","SEt-cOoKie","seT-cOoKie","SeT-cOoKie","sET-cOoKie","SET-cOoKie","set-COoKie","Set-COoKie","sEt-COoKie","SEt-COoKie","seT-COoKie","SeT-COoKie","sET-COoKie","SET-COoKie","set-coOKie","Set-coOKie","sEt-coOKie","SEt-coOKie","seT-coOKie","SeT-coOKie","sET-coOKie","SET-coOKie","set-CoOKie","Set-CoOKie","sEt-CoOKie","SEt-CoOKie","seT-CoOKie","SeT-CoOKie","sET-CoOKie","SET-CoOKie","set-cOOKie","Set-cOOKie","sEt-cOOKie","SEt-cOOKie","seT-cOOKie","SeT-cOOKie","sET-cOOKie","SET-cOOKie","set-COOKie","Set-COOKie","sEt-COOKie","SEt-COOKie","seT-COOKie","SeT-COOKie","sET-COOKie","SET-COOKie","set-cookIe","Set-cookIe","sEt-cookIe","SEt-cookIe","seT-cookIe","SeT-cookIe","sET-cookIe","SET-cookIe","set-CookIe","Set-CookIe","sEt-CookIe","SEt-CookIe","seT-CookIe","SeT-CookIe","sET-CookIe","SET-CookIe","set-cOokIe","Set-cOokIe","sEt-cOokIe","SEt-cOokIe","seT-cOokIe","SeT-cOokIe","sET-cOokIe","SET-cOokIe","set-COokIe","Set-COokIe","sEt-COokIe","SEt-COokIe","seT-COokIe","SeT-COokIe","sET-COokIe","SET-COokIe","set-coOkIe","Set-coOkIe","sEt-coOkIe","SEt-coOkIe","seT-coOkIe","SeT-coOkIe","sET-coOkIe","SET-coOkIe","set-CoOkIe","Set-CoOkIe","sEt-CoOkIe","SEt-CoOkIe","seT-CoOkIe","SeT-CoOkIe","sET-CoOkIe","SET-CoOkIe","set-cOOkIe","Set-cOOkIe","sEt-cOOkIe","SEt-cOOkIe","seT-cOOkIe","SeT-cOOkIe","sET-cOOkIe","SET-cOOkIe","set-COOkIe","Set-COOkIe","sEt-COOkIe","SEt-COOkIe","seT-COOkIe","SeT-COOkIe","sET-COOkIe","SET-COOkIe","set-cooKIe","Set-cooKIe","sEt-cooKIe","SEt-cooKIe","seT-cooKIe","SeT-cooKIe","sET-cooKIe","SET-cooKIe","set-CooKIe","Set-CooKIe","sEt-CooKIe","SEt-CooKIe","seT-CooKIe","SeT-CooKIe","sET-CooKIe","SET-CooKIe","set-cOoKIe","Set-cOoKIe","sEt-cOoKIe","SEt-cOoKIe","seT-cOoKIe","SeT-cOoKIe","sET-cOoKIe","SET-cOoKIe","set-COoKIe","Set-COoKIe","sEt-COoKIe","SEt-COoKIe","seT-COoKIe","SeT-COoKIe","sET-COoKIe","SET-COoKIe","set-coOKIe","Set-coOKIe","sEt-coOKIe","SEt-coOKIe","seT-coOKIe","SeT-coOKIe","sET-coOKIe","SET-coOKIe","set-CoOKIe","Set-CoOKIe","sEt-CoOKIe","SEt-CoOKIe","seT-CoOKIe","SeT-CoOKIe","sET-CoOKIe","SET-CoOKIe","set-cOOKIe","Set-cOOKIe","sEt-cOOKIe","SEt-cOOKIe","seT-cOOKIe","SeT-cOOKIe","sET-cOOKIe","SET-cOOKIe","set-COOKIe","Set-COOKIe","sEt-COOKIe","SEt-COOKIe","seT-COOKIe","SeT-COOKIe","sET-COOKIe","SET-COOKIe","set-cookiE","Set-cookiE","sEt-cookiE","SEt-cookiE","seT-cookiE","SeT-cookiE","sET-cookiE","SET-cookiE","set-CookiE","Set-CookiE","sEt-CookiE","SEt-CookiE","seT-CookiE","SeT-CookiE","sET-CookiE","SET-CookiE","set-cOokiE","Set-cOokiE","sEt-cOokiE","SEt-cOokiE","seT-cOokiE","SeT-cOokiE","sET-cOokiE","SET-cOokiE","set-COokiE","Set-COokiE","sEt-COokiE","SEt-COokiE","seT-COokiE","SeT-COokiE","sET-COokiE","SET-COokiE","set-coOkiE","Set-coOkiE","sEt-coOkiE","SEt-coOkiE","seT-coOkiE","SeT-coOkiE","sET-coOkiE","SET-coOkiE","set-CoOkiE","Set-CoOkiE","sEt-CoOkiE","SEt-CoOkiE","seT-CoOkiE","SeT-CoOkiE","sET-CoOkiE","SET-CoOkiE","set-cOOkiE","Set-cOOkiE","sEt-cOOkiE","SEt-cOOkiE","seT-cOOkiE","SeT-cOOkiE","sET-cOOkiE","SET-cOOkiE","set-COOkiE","Set-COOkiE","sEt-COOkiE","SEt-COOkiE","seT-COOkiE","SeT-COOkiE","sET-COOkiE","SET-COOkiE","set-cooKiE","Set-cooKiE","sEt-cooKiE","SEt-cooKiE","seT-cooKiE","SeT-cooKiE","sET-cooKiE","SET-cooKiE","set-CooKiE","Set-CooKiE","sEt-CooKiE","SEt-CooKiE","seT-CooKiE","SeT-CooKiE","sET-CooKiE","SET-CooKiE","set-cOoKiE","Set-cOoKiE","sEt-cOoKiE","SEt-cOoKiE","seT-cOoKiE","SeT-cOoKiE","sET-cOoKiE","SET-cOoKiE","set-COoKiE","Set-COoKiE","sEt-COoKiE","SEt-COoKiE","seT-COoKiE","SeT-COoKiE","sET-COoKiE","SET-COoKiE","set-coOKiE","Set-coOKiE","sEt-coOKiE","SEt-coOKiE","seT-coOKiE","SeT-coOKiE","sET-coOKiE","SET-coOKiE","set-CoOKiE","Set-CoOKiE","sEt-CoOKiE","SEt-CoOKiE","seT-CoOKiE","SeT-CoOKiE","sET-CoOKiE","SET-CoOKiE","set-cOOKiE","Set-cOOKiE","sEt-cOOKiE","SEt-cOOKiE","seT-cOOKiE","SeT-cOOKiE","sET-cOOKiE","SET-cOOKiE","set-COOKiE","Set-COOKiE","sEt-COOKiE","SEt-COOKiE","seT-COOKiE","SeT-COOKiE","sET-COOKiE","SET-COOKiE","set-cookIE","Set-cookIE","sEt-cookIE","SEt-cookIE","seT-cookIE","SeT-cookIE","sET-cookIE","SET-cookIE","set-CookIE","Set-CookIE","sEt-CookIE","SEt-CookIE","seT-CookIE","SeT-CookIE","sET-CookIE","SET-CookIE","set-cOokIE","Set-cOokIE","sEt-cOokIE","SEt-cOokIE","seT-cOokIE","SeT-cOokIE","sET-cOokIE","SET-cOokIE","set-COokIE","Set-COokIE","sEt-COokIE","SEt-COokIE","seT-COokIE","SeT-COokIE","sET-COokIE","SET-COokIE","set-coOkIE","Set-coOkIE","sEt-coOkIE","SEt-coOkIE","seT-coOkIE","SeT-coOkIE","sET-coOkIE","SET-coOkIE","set-CoOkIE","Set-CoOkIE","sEt-CoOkIE","SEt-CoOkIE","seT-CoOkIE","SeT-CoOkIE","sET-CoOkIE","SET-CoOkIE","set-cOOkIE","Set-cOOkIE","sEt-cOOkIE","SEt-cOOkIE","seT-cOOkIE","SeT-cOOkIE","sET-cOOkIE","SET-cOOkIE","set-COOkIE","Set-COOkIE","sEt-COOkIE","SEt-COOkIE","seT-COOkIE","SeT-COOkIE","sET-COOkIE","SET-COOkIE","set-cooKIE","Set-cooKIE","sEt-cooKIE","SEt-cooKIE","seT-cooKIE","SeT-cooKIE","sET-cooKIE","SET-cooKIE","set-CooKIE","Set-CooKIE","sEt-CooKIE","SEt-CooKIE","seT-CooKIE","SeT-CooKIE","sET-CooKIE","SET-CooKIE","set-cOoKIE","Set-cOoKIE","sEt-cOoKIE","SEt-cOoKIE","seT-cOoKIE","SeT-cOoKIE","sET-cOoKIE","SET-cOoKIE","set-COoKIE","Set-COoKIE","sEt-COoKIE","SEt-COoKIE","seT-COoKIE","SeT-COoKIE","sET-COoKIE","SET-COoKIE","set-coOKIE","Set-coOKIE","sEt-coOKIE","SEt-coOKIE","seT-coOKIE","SeT-coOKIE","sET-coOKIE","SET-coOKIE","set-CoOKIE","Set-CoOKIE","sEt-CoOKIE","SEt-CoOKIE","seT-CoOKIE","SeT-CoOKIE","sET-CoOKIE","SET-CoOKIE","set-cOOKIE","Set-cOOKIE","sEt-cOOKIE","SEt-cOOKIE","seT-cOOKIE","SeT-cOOKIE","sET-cOOKIE","SET-cOOKIE","set-COOKIE","Set-COOKIE","sEt-COOKIE","SEt-COOKIE","seT-COOKIE","SeT-COOKIE","sET-COOKIE","SET-COOKIE"]
const readOnlyHeaders = [
    "memoept-encoding",
    "content-length",
    "if-modified-since",
    "if-none-Match",
    "if-range",
    "if-unmodified-since",
    "range",
    "transfer-encoding",
    "via"
];


const isBinaryEncoding = (headers) => {
    const contentEncoding = headers['content-encoding'];

    if (typeof contentEncoding === 'string') {
        return contentEncoding.split(',').some(value =>
            BINARY_ENCODINGS.some(binaryEncoding => value.indexOf(binaryEncoding) !== -1)
        );
    }
}

const isBinaryContent = (headers, options) => {
    const contentTypes = [].concat(options.binary
        ? options.binary
        : BINARY_CONTENT_TYPES
    ).map((candidate) =>
        new RegExp(`^${candidate.replace(/\*/g, '.*')}$`)
    );

    const contentType = (headers['content-type'] || '').split(';')[0];
    return !!contentType && contentTypes.some(candidate => candidate.test(contentType));
}

const isBinary = (headers, options ) => {
    if (options.binary === false) {
        return false;
    }

    if (typeof options.binary === 'function') {
        return options.binary(headers);
    }

    return isBinaryEncoding(headers) || isBinaryContent(headers, options);
};

const sanitizeHeaders = (headers) => {
    return Object.keys(headers).reduce((memo , key) => {
        const value = headers[key];
        const normalizedKey = key.toLowerCase();

        if (readOnlyHeaders.includes(normalizedKey)) {
            return memo;
        }

        if (memo[normalizedKey]) {
            memo[normalizedKey].push({
                key: key,
                value: value
            });

            return memo;
        }

        if (Array.isArray(value) && normalizedKey === 'set-cookie') {
            value.forEach((cookie, i) => {
                memo[setCookieVariations[i]] = cookie;
            });

            return memo;
        }

        memo[normalizedKey] = [{
            key: key,
            value: value
        }];

        return memo;
    }, {});
};

module.exports = response => {

    const { statusCode } = response;
    const headers = response.headers ? response.headers : {};
    if (headers['transfer-encoding'] === 'chunked' || response.chunkedEncoding) {
        throw new Error('chunked encoding not supported');
    }
    
    const isBase64Encoded = isBinary(headers,{});
    let body = response.body

    return {
        status: statusCode,
        statusDescription: STATUS_CODES[statusCode],
        headers: sanitizeHeaders(headers),
        body,
        bodyEncoding: isBase64Encoded ? 'base64' : 'text'
    };
}