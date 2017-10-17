# EsubWeb

Shasta Angular project for eSub https://esub.com/, originally generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.4.

## Node Version

Please check your Node.js and NPM versions to make sure they match…Jenkins build environment. https://nodejs.org/download/release/v7.10.1/
- Node.js  = 7.10.1
- NPM  = 4.2.0

## Development server

Run `npm run serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

a) To run unit tests locally run one of the following commands
  - (during development, includes live reload) `ng test --browsers Chrome` OR `ng test --browsers PhantomJS`
  - (just to run tests once and view results) run same as above and include `--single-run` flag

b) If running from within Jenkins, run `npm run test` to execute the unit tests via [Karma], includes `snyk test`

## Checking unit test code coverage

Run `npm run code-coverage`  (pre-req, install http-server via `npm i -g http-server`)

Then navigate to the address listed in your terminal

## Running end-to-end tests

end-to-end tests are handled outside of the Angular project within Robot Framework
