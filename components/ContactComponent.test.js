const ContactComponent = require("./ContactComponent")

// @ponicode
describe("sendMail", () => {
    let inst

    beforeEach(() => {
        inst = new ContactComponent.default("Michael")
    })

    test("0", () => {
        let callFunction = () => {
            inst.sendMail()
        }
    
        expect(callFunction).not.toThrow()
    })
})
