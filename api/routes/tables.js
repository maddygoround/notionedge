// Load the AWS SDK for Node.js
const {getTableData} = require('../notion/tables');

module.exports = async (req, res) => {
    try {
        return await getTableData(req.params.id, req.notionToken);
    } catch (err) {
        throw err;
    }
}   