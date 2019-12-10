import Page from './baseClasses/Page'

class Homepage extends Page {
  open() {
    super.open()
  }

  login() {
    super.login()
  }

  get title() {
    return browser.getTitle()
  }

  // Reason for using body + id is that id selectors are about to be deprecated for webdriver/selenium.
  // The trick of inserting body makes webdriverIO to use css selectors method instead
  get inputNumber() {
    return $('form').$('input')
  }

  get sendButton() {
    return $('form').$('button')
  }

  get correctInputMessage() {
    return $('h2[test-id=ok]')
  }

  get errorMessage() {
    return $('h2[test-id=Error]')
  }


}

export default new Homepage()
