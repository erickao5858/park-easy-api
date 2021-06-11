const concurrently = require('concurrently')

concurrently([
    { command: 'npm start', name: 'Server' },
    { command: 'npm test', name: 'Unit Test' }
], {
    prefix: 'name',
    killOthers: 'failure'
}).then(
    onSuccess = (exitInfo) => { },
    onFailure = (exitInfo) => {
        const testInfo = exitInfo.find((info) => info.command.command == 'npm test')
        if (testInfo.exitCode != 0) {
            console.log('Process terminate. Reason: did not pass unit tests.')
        }
        process.exit(1)
    }
)
