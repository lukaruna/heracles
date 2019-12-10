const {Verifier} = require("@pact-foundation/pact")
const path = require("path")

const {app} = require("../../app")

const port = 8081

const consumerPathFile = path.join(process.cwd(),'../frontend/pacts/moneyformat-consumer-moneyformat-provider.json');

describe("Pact verification", () => {

    const server = app.listen(port,() => console.log(`Provider service listening on port ${port}`))

    afterAll(()=>{
        server.close()
    })

    test("Should validate expectations from the front-end consumer", () => {
        let opts = {
            provider: 'Our Provider',
            providerBaseUrl: `http://localhost:${port}`,
            pactUrls: [consumerPathFile]
        }
        return new Verifier().verifyProvider(opts).then(output => {
            console.log('Pact Verification Complete!')
            console.log(output)
        })
    })
})