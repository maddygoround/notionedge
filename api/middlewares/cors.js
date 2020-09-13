module.exports = async (req, res, next) => {
    // set SPR/CORS headers
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Cache-Control', 's-maxage=5, stale-while-revalidate')
    res.header('Access-Control-Allow-Methods', 'GET')
    res.header('Access-Control-Allow-Headers', 'pragma')

    if (req.method === 'OPTIONS') {
        res.status(200);
        res.end();
        return true
    }

    next();
}