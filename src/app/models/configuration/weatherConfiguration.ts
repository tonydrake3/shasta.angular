import {environment} from '../../../environments/environment';

export const weatherConfiguration = {
    key: environment.weatherApiKey,
    format: 'json',
    includelocation: 'yes',
    showlocaltime: 'yes',
    tp: '24'
};
