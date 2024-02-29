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
});

export const cmaClient = createCMA({
    space: spaceId,
    environment: environmentId,
    accessToken: process.env.CMA_TOKEN,
});