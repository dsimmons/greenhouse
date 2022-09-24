import { ethers } from 'ethers'
import { request } from 'graphql-request'

import { LENS_API_URI } from './constants';
import { getProfile } from './queries';

const DEFAULT_PROVIDER = ethers.getDefaultProvider()

export async function resolveEnsAddr(ensAddr) {
  return DEFAULT_PROVIDER.resolveName(ensAddr);
}

export async function queryLensByAddr(addr) {
  return request(LENS_API_URI, getProfile, { addr });
}
