const {formatMoney} = require("../../requesters/formatMoney");
const path = require("path");
const {Pact} = require("@pact-foundation/pact");


describe("Format Money API", () => {

    const interactionArray = [
        {value: 1000, expectedOutput: "1 000.00"},
        {value: 2, expectedOutput: "2.00"},
        {value: 0.01, expectedOutput: "0.01"},
        {value: 0.0001, expectedOutput: "0.00"},
        {value: 0, expectedOutput: "0.00"},
    ]
    describe("format money contract tests (positive scenarios)", () => {
        interactionArray.map((each)=>{
            const {value, expectedOutput} = each

            test(`Should interact correctly given value of ${value}`, async () => {
                const interaction = {
                    uponReceiving: `A request with the value of ${value}`,
                    withRequest: {
                        method: 'POST',
                        path: '/formatMoney',
                        body: {
                            value: value
                        },
                        headers: {
                            "Content-Type": 'application/json',
                        }
                    },
                    willRespondWith: {
                        status: 200,
                        body: {
                            value: expectedOutput
                        },
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                        }
                    }
                }
                await provider.addInteraction(interaction)

                const res = await formatMoney({value})
                expect(res.status).toBe(200)
                expect(res.data).toHaveProperty('value', expectedOutput)
            })
        })
    })

    describe('format money contract testing (negative scenarios)', () => {
        const negativeInteractionArray = [
            {value: -1},
            {value: 'some text'},
            {value: '-0.0001'},
            {value: '-0.0'}
        ]
        negativeInteractionArray.map((each)=>{
            const {value} = each
            test(`Should interact correctly by validating error when value is ${value}`, async () => {
                const interaction = {
                    uponReceiving: `A request with the value of ${value}`,
                    withRequest: {
                        method: 'POST',
                        path: '/formatMoney',
                        body: {
                            value: value
                        },
                        headers: {
                            "Content-Type": 'application/json'
                        }
                    },
                    willRespondWith: {
                        status: 400
                    }
                }
                await provider.addInteraction(interaction)
                try {
                    const res = await formatMoney({value})
                    throw new Error()
                } catch (err) {
                    expect(err.response.status).toBe(400)
                }
            })
        })


    })
})