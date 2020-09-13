const { call  } = require('./call');

const getRecordValues = ({
    userIds,
}, token) => {
    return call('getRecordValues', {
        requests: userIds.map((id) => ({ id, table: "notion_user" }))
    }, token);
};

const getUsers = async (userIds, token) => {
    try {
        const users = await getRecordValues(userIds, token);
        if (users && users.results) {
            return users.results.map((u) => {
                const user = {
                    id: u.value.id,
                    firstName: u.value.given_name,
                    lastLame: u.value.family_name,
                    fullName: u.value.given_name + " " + u.value.family_name,
                    profilePhoto: u.value.profile_photo,
                };
                return user;
            });
        }
        return [];
    } catch (err) {
        console.error(`Failed to load pageData for ${pageId}`, err);
        return [];
    }
};

module.exports = { getUsers }