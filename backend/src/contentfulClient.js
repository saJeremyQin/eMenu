import { createClient as createCDA } from 'contentful';
import { createClient as createCMA } from 'contentful-management';
import dotenv from 'dotenv';

const isCodespace = !!process.env.PRIVATE_KEY_ID;

// if it is local, config dotenv
if(!isCodespace) {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
}

export const spaceId = 'xcgzqirx0bln';
export const environmentId = 'develop';


export const cdaClient = createCDA({
    space: spaceId,
    environment: environmentId,
    accessToken: process.env.CDA_TOKEN,
    // accessToken:'zu0M1zS19jfMeAroc1tARgWxD03jd8tWdG5nBtUJt9U',
});

export const cmaClient = createCMA({
    space: spaceId,
    environment: environmentId,
    accessToken: process.env.CMA_TOKEN,
    // accessToken:'CFPAT-Um3vfnH5eISh-24r-RNgbKaRcsUBuX0CZ_FFG6IJ7Is',
});