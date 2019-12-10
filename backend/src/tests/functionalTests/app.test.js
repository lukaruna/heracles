const request =require("supertest")
const {app} = require("../../app")

describe("Unit Test", () => {

    describe("Positive scenarios", () => {
        const arrayOfInputAndOutputs = [
            {input: 0, output: "0.00"},
            {input: 0.01, output: "0.01"},
            {input: 0.006, output: "0.01"},
            {input: 0.005, output: "0.01"},
            {input: 0.004, output: "0.00"},
            {input: 3, output: "3.00"},
            {input: "1e+0", output: "1.00"},
            {input: 1.16934234, output: "1.17"},
            {input: 1000, output: "1 000.00"},
            {input: 1000000, output: "1 000 000.00"},
            {input: 2000000000, output: "2 000 000 000.00"},
            {input: 20000000000, output: "20 000 000 000.00"},
        ]

        arrayOfInputAndOutputs.map((each) => {
            test(`should return ${each.output} when input is ${each.input}`, async () => {
                const response = await request(app)
                    .post('/formatMoney')
                    .send({value: each.input})
                expect(response.status).toBe(200)
                expect(response.body.value).toBe(each.output)
            })
        })

        test("should fuzz test endpoint for numbers between 0 and 999", async () => {
            const input = Math.floor(Math.random() * 999)
            const response = await request(app)
                .post('/formatMoney')
                .send({value: input})
            expect(response.status).toBe(200)
            expect(response.body.value).toBe(`${input}.00`)
        })

        test("should fuzz test endpoint for numbers between 1000 and 9999", async () => {
            const input = (Math.floor(Math.random() * 8999) + 1000)
            const inputString = input.toString()
            const expectedOutput = `${inputString
                .substr(0, 1)} ${inputString.substr(1)}.00`

            const response = await request(app)
                .post('/formatMoney')
                .send({value: input})
            expect(response.status).toBe(200)
            expect(response.body.value).toBe(expectedOutput)
        })

        test("should fuzz test endpoint for numbers between 1000000 and 9999999", async () => {
            const input = (Math.floor(Math.random() * 8999999) + 1000000)
            const inputString = input.toString()
            const expectedOutput = `${inputString
                .substr(0, 1)} ${inputString.substr(1, 3)} ${inputString.substr(4)}.00`

            const response = await request(app)
                .post('/formatMoney')
                .send({value: input})
            expect(response.status).toBe(200)
            expect(response.body.value).toBe(expectedOutput)
        })
    })

    describe("Negative scenarios", () => {

    /*
    This array has:
        1. Numbers that should be greater than zero and a few edge cases;
        2. Different typeof;
        3. undefined;
        4. Massive copy and paste from Big List of Naughty Strings.
     */

    const arrayofBadInput = [
        undefined,
        '0000.01',   // Octal numeric literals are not allowed in use strict mode (javascript), should throw 400
        "-0.01",
        "-0.00001",
        "",
        "undefined",
        "undef",
        "null",
        "NULL",
        "(null)",
        "nil",
        "NIL",
        "true",
        "false",
        "True",
        "False",
        "TRUE",
        "FALSE",
        "None",
        "hasOwnProperty",
        "\\",
        "\\\\",
        "$1.00",
        "-1",
        "-1.00",
        "-$1.00",
        "-1/2",
        "-1E2",
        "-1E02",
        "-1E+02",
        "1/0",
        "0/0",
        "-0",
        "-0.0",
        "0..0",
        ".",
        "0.0.0",
        "0,00",
        "0,,0",
        ",",
        "0,0,0",
        "0.0/0",
        "1.0/0.0",
        "0.0/0.0",
        "1,0/0,0",
        "0,0/0,0",
        "--1",
        "-",
        "-.",
        "-,",
        "Infinity",
        "-Infinity",
        "INF",
        "1#INF",
        "-1#IND",
        "1#QNAN",
        "1#SNAN",
        "1#IND",
        "0x0",
        "0xffffffff",
        "0xffffffffffffffff",
        ",./;'[]\\-=",
        "<>?:\"{}|_+",
        "åß∂ƒ©˙∆˚¬…æ",
        "œ∑´®†¥¨ˆøπ“‘",
        "¡™£¢∞§¶•ªº–≠",
        "<foo val=“bar” />",
        "<foo val=“bar” />",
        "<foo val=”bar“ />",
        "<foo val=`bar' />",
        "사회과학원 어학연구소",
        "찦차를 타고 온 펲시맨과 쑛다리 똠방각하",
        "社會科學院語學研究所",
        "울란바토르",
        "😍",
        "👩🏽",
        "< / script >< script >alert(123)< / script >",
        "Kernel.exit(1)",
        "eval(\"puts 'hello world'\")",
    ]
    arrayofBadInput.map((each) => {
        test(`should throw 400 status code when input is ${each}`, async () => {
            const response = await request(app)
                .post('/formatMoney')
                .send({value: each})
            expect(response.status).toBe(400)
        })
    })

        test("Should throw 400 status code when empty object is sent", async () => {
            const response = await request(app)
                .post('/formatMoney')
                .send({})
            expect(response.status).toBe(400)
        })
    })

    /*
   There's definitely room for improvement here:
   ~ Tests manipulating headers, especially CORS (I have set CORS to '*', but in real life that can lead to exploits!);
   ~ More fuzz testing;
   ~ Test assertions for messages;
   ~ [...]

   (Fun fact: Mutation testing actually gets the first point to be improved!)
  */

})