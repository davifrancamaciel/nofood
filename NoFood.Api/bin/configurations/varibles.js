const variables = {
    Api: {
        port: process.env.port || 3000
    },
    Database: {
        connection: process.env.connection || 'mongodb+srv://davi:8680@cluster0-r85xs.mongodb.net/test?retryWrites=true'
    },
    Security: {
        secretyKey: 'lslcljdvdjçdjlçbernardo'
    }
}

module.exports = variables;