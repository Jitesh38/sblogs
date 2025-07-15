const bcrypt = require('bcrypt');

async function encryptPassword(password) {
    const hashPassword = await bcrypt.hash(password, 10).then((hash) => {
        return hash

    });
    return hashPassword
}
async function decryptPassword(password, hash) {
    let result = await bcrypt.compare(password, hash).then((result) => {
        return result
    });
    return result
}

module.exports = {
    encryptPassword,
    decryptPassword
}