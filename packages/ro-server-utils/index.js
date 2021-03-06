// We use the import structure
// - 'command': (...args) => require(<PATH>)(...args)
// as a way for the main app to only require needed utilities
const API = {
    // Initialization
    makeApp: (...args) => require('./makeApp')(...args),
    runApp: (...args) => require('./runApp')(...args),
    // Common Processes
    query: (...args) => require('./query')(...args),
    sendMessage: (...args) => require('./sendMessage')(...args),
    authenticate: (...args) => require('./authenticate')(...args),
    hashPass: (...args) => require('./hashPass')(...args),
    jwt: require('./jwt'),
    // Helpers
    getTextFromFile: (...args) => require('./helpers/getTextFromFile')(...args),
    sendLocal: (...args) => require('./helpers/sendLocal')(...args),
    ERRORS: require('./helpers/ERRORS'),
}

module.exports = API;
