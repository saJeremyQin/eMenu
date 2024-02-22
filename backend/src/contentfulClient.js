import { createClient as createCDA } from 'contentful';
import { createClient as createCMA } from 'contentful-management';

export const spaceId = 'xcgzqirx0bln';
export const environmentId = 'develop';
const cdatoken = 'zu0M1zS19jfMeAroc1tARgWxD03jd8tWdG5nBtUJt9U';
const cmatoken = 'CFPAT-Um3vfnH5eISh-24r-RNgbKaRcsUBuX0CZ_FFG6IJ7Is';

export const cdaClient = createCDA({
    space: 'xcgzqirx0bln',
    environment: 'develop',
    accessToken: cdatoken,
});

export const cmaClient = createCMA({
    space: spaceId,
    environment: environmentId,
    accessToken: cmatoken
});