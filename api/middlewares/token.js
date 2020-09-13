const { NOTION_TOKEN } = require('../notion/constants');

module.exports = (req, res , next) => {
    const notionToken = NOTION_TOKEN || (req.headers["authorization"] || req.headers["Authorization"] || "").split("Bearer ")[1] || undefined;
    req.notionToken = notionToken;
    next();
}