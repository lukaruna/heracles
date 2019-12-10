import env from '../../../../env'

export default class Page {
  open(path = '') {
    browser.url(`${env.baseUrl}/${path}`)
  }

  get url() {
    return browser.getUrl()
  }

  get icon() {}
}
