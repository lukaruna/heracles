import Homepage from '../../pageObjects/Homepage'

// Generates a number from 1 to n, default is 20
const randomNumberGen = (n = 20) => (Math.random() * (n - 1) + 1) | 0

describe('Format money Home page', () => {
  describe("Positive tests", () => {
    it('should format money correctly', () => {
      Homepage.open()
      const value = 123
      const expectedOutput = '123.00'

      Homepage.inputNumber.setValue(value)
      Homepage.sendButton.click()

      Homepage.correctInputMessage.waitForVisible(4000)
      expect(Homepage.correctInputMessage.getText()).to.equal(expectedOutput)
    })
  })

  describe("Negative tests", () => {
    it('should throw and render error for invalid data', () => {
      Homepage.open()
      const value = -123
      const expectedOutput = 'Error'
      const redRGBA = 'rgba(178,34,34,1)'

      Homepage.inputNumber.setValue(value)
      Homepage.sendButton.click()

      Homepage.errorMessage.waitForVisible(4000)
      expect(Homepage.errorMessage.getText()).to.equal(expectedOutput)
      expect(Homepage.errorMessage.getCssProperty('color').value).to.equal(redRGBA)
      })
  })

})
