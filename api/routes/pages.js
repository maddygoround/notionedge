// Load the AWS SDK for Node.js
const {getPageData} = require('../notion/pages');
module.exports = async (req, res) => {
    try {
        return await getPageData(req.params.id, req.notionToken);
    } catch (err) {
        throw err;
    }
}   