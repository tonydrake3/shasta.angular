// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

// To run in Jenkins use
//    ng test --browsers PhantomJS --single-run --reporters junit     << will run with headless browser, close after single run, and report to /esub-web/unit-test-results/$browser.xml

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-junit-reporter'),
      require('@angular/cli/plugins/karma'),
      require('karma-spec-reporter')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['@angular/cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'coverage-istanbul', 'junit', 'spec']
              : ['progress', 'kjhtml', 'junit', 'spec'],
    junitReporter: {
      outputDir: 'unit-test-results'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'PhantomJS', 'Firefox'],
    singleRun: false,
    // below is bits for testing out why PhantomJS is barfing sometimes in Jenkins
    browserNoActivityTimeout: 100000,     // default 10,000ms
    browserDisconnectTolerance: 5,        // default 0
    retryLimit: 5                         // default 2
  });
};
