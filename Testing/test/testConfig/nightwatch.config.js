module.exports = {
      src_folders: ["./test/src"],
      output_folder : "./testOutput",
      live_output : true,
      page_objects_path: ['test/src/page-objects/page-loginPage'],
      custom_commands_path: ['nightwatch/custom-commands'],
      custom_assertions_path: ['nightwatch/custom-assertions'],
      plugins: [],
      globals_path: './globals.js',
      webdriver: {},
      unit_tests_mode: false,
     
      test_workers: {
        // enabled: true
      },
     
      test_settings: {
        default: {
          disable_error_log: false,
          launch_url: 'http://10.230.40.170:8080/UDE/',
          skip_testcases_on_fail: false,
     
          screenshots: {
            enabled: false,
            path: 'screens',
            on_failure: true
          },
     
          desiredCapabilities: {
            browserName: 'edge'
          },
         
          webdriver: {
            start_process: true,
            server_path: ''
          },
         
        },
       
        firefox: {
          desiredCapabilities: {
            browserName: 'firefox',
            alwaysMatch: {
              acceptInsecureCerts: true,
              'moz:firefoxOptions': {
                args: [
                  // '-headless',
                  // '-verbose'
                ]
              }
            }
          },
          webdriver: {
            start_process: true,
            server_path: '',
            cli_args: [
              // very verbose geckodriver logs
              // '-vv'
            ]
          }
        },
       
        chrome: {
          desiredCapabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
              // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
              //
              // w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
              w3c: true,
              args: [
                //'--no-sandbox',
                //'--ignore-certificate-errors',
                //'--allow-insecure-localhost',
                //'--headless'
              ]
            }
          },
     
          webdriver: {
            start_process: true,
            server_path: '',
            cli_args: [
              // --verbose
            ]
          }
        },
       
        edge: {
          desiredCapabilities: {
            browserName: 'MicrosoftEdge',
            'ms:edgeOptions': {
              w3c: true,
              // More info on EdgeDriver: https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options
              args: [
                //'--headless'
              ]
            }
          },
     
          webdriver: {
            start_process: true,
            // Follow https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/?tabs=c-sharp#download-microsoft-edge-webdriver
            // to download the Edge WebDriver and set the location of extracted msedgedriver below:
            server_path: '',
            cli_args: [
              // --verbose
            ]
          }
        },
       
        //////////////////////////////////////////////////////////////////////////////////
        // Configuration for using the browserstack.com cloud service                    |
        //                                                                               |
        // Please set the username and access key by setting the environment variables:  |
        // - BROWSERSTACK_USERNAME                                                       |
        // - BROWSERSTACK_ACCESS_KEY                                                     |
        // .env files are supported                                                      |
        //////////////////////////////////////////////////////////////////////////////////
        browserstack: {
          selenium: {
            host: 'hub.browserstack.com',
            port: 443
          },
          // More info on configuring capabilities can be found on:
          // https://www.browserstack.com/automate/capabilities?tag=selenium-4
          desiredCapabilities: {
            'bstack:options': {
              userName: '',
              accessKey: ''
            }
          },
     
          disable_error_log: true,
          webdriver: {
            timeout_options: {
              timeout: 15000,
              retry_attempts: 3
            },
            keep_alive: true,
            start_process: false
          }
        },
     
        'browserstack.local': {
          extends: 'browserstack',
          desiredCapabilities: {
            'browserstack.local': true
          }
        },
       
        'browserstack.chrome': {
          extends: 'browserstack',
          desiredCapabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
              w3c: true
            }
          }
        },
       
        'browserstack.firefox': {
          extends: 'browserstack',
          desiredCapabilities: {
            browserName: 'firefox'
          }
        },
       
        'browserstack.local_chrome': {
          extends: 'browserstack.local',
          desiredCapabilities: {
            browserName: 'chrome'
          }
        },
       
        'browserstack.local_firefox': {
          extends: 'browserstack.local',
          desiredCapabilities: {
            browserName: 'firefox'
          }
        },
       
      },
     
    };