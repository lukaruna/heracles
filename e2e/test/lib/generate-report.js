var allure = require('allure-commandline')
var generation = allure([
  'generate',
  '--clean',
  '--report-dir',
  'allure/allure-report',
  'allure/allure-results'
])

generation.on('exit', function() {
    allure(['open', 'allure/allure-report']);
});
