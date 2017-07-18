// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import * as versions from './versions';

export const environment = {
  production: false,
  gitVersion: getGitVersion(),
  apiUrl: 'http://api.develop.shasta.esubonline.com/',
  mapsUrl: 'https://maps.googleapis.com/maps/api/',
  mapsApiKey: 'AIzaSyDlNxrtp5Tfn5Oi3zx0-4Rlmcu7enBv4Lc',
  weatherUrl: 'https://api.worldweatheronline.com/premium/v1/weather.ashx',
  weatherApiKey: '6d82e6d111f04b569c443219172604',
  webUrl: ''
};

function getGitVersion (): string {
  return versions.versions.version + ' ' + versions.versions.commit + ' ' + versions.versions.branch;
}
