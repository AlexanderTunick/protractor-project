import {Config, browser} from 'protractor';
const matchers = require('jasmine-protractor-matchers');
const JasmineConsoleReporter = require('jasmine-console-reporter');
const JUnitXmlReporter = require('jasmine-reporters').JUnitXmlReporter;

let config: Config = {
    directConnect: true, // For direct connection with Chrome
    // seleniumAddress: 'http://localhost:4444/wd/hub', // if you want to use Selenoid for remote launching
    capabilities: {
        // enableVNC: true, // Selenoid UI
        browserName: 'chrome',
        version: '72.0',
        allScriptsTimeout: 50000
    },
    chromeOptions: {
        args: [
            // '--headless',
        ]
    },
    specs: [
        '../specs/*.spec.js',
        '../specs/**/*.spec.js'
    ],

    suites: {
        // homepage: 'tests/e2e/homepage/**/*Spec.js',
        // http://www.protractortest.org/#/page-objects
    },
    SELENIUM_PROMISE_MANAGER: false,
    framework: 'jasmine',

    onPrepare() {
        const reporter = new JasmineConsoleReporter({
            colors: 1,           // (0|false)|(1|true)|2
            cleanStack: 1,       // (0|false)|(1|true)|2|3
            verbosity: 4,        // (0|false)|1|2|(3|true)|4|Object
            listStyle: 'indent', // "flat"|"indent"
            timeUnit: 'ms',      // "ms"|"ns"|"s"
            timeThreshold: {ok: 500, warn: 1000, ouch: 3000}, // Object|Number
            activity: false,     // boolean or string ("dots"|"star"|"flip"|"bouncingBar"|...)
            emoji: true,
            beep: true
        });
        jasmine.getEnv().addReporter(reporter);

        let junit_reporter_options = {
            savePath: './test_results/',
            consolidateAll: true
        };
        jasmine.getEnv().addReporter(new JUnitXmlReporter(junit_reporter_options));

        beforeEach(() => {
            // Adding .toAppear() and .toDisappear() into available matchers.
            jasmine.addMatchers(matchers)
        });

        afterEach(async () => {
            // Clearing browser data after each test
            await browser.manage().deleteAllCookies();
            await browser.executeScript('window.sessionStorage.clear(); window.localStorage.clear();')
        })
    },

    onCleanUp() {

    }
};

exports.config = config;