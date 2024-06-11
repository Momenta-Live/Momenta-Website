import { ethers } from "ethers";

export const ENV = {
  DEV: "dev",
  STAGING: "staging",
  PROD: "prod",
  LOCAL: "local",
};

const Constants = {
  ENV: ENV,
  PAGINATION: {
    INITIAL_PAGE: 1,
    LIMIT: 10,
    LIMIT_MIN: 1,
    LIMIT_MAX: 50,
  },
  DEFAULT_CHAIN_ID: 11155111,
  DEV_CHAIN_ID: 99999,
  NON_ETH_CHAINS: [137, 80002, 56, 97, 10, 11155420, 2442, 1101, 421614, 42161, 122, 123, 80085],
  ETH_CHAINS: [1, 11155111],
};

export function isValidETHAddress(address) {
  console.log("isValidETHAddress", address);
  console.log("ethers", ethers);
  return ethers.utils.isAddress(address);
}

const AddressValidators = {
  // Ethereum
  eip155: ({ address }) => {
    return isValidETHAddress(address);
  },
  // Add other chains here
};

export function validateCAIP(addressInCAIP) {
  const [blockchain, networkId, address] = addressInCAIP.split(":");

  console.log("validateCAIP", blockchain, networkId, address);

  if (!blockchain || blockchain === undefined) return false;
  if (!networkId || networkId === undefined) return false;
  if (!address || address === undefined) return false;

  console.log("Validating Address...");

  const validatorFn = AddressValidators[blockchain];

  return validatorFn({ address });
}

export function getFallbackETHCAIPAddress(env, address) {
  let chainId = 1; // by default PROD

  if (env === Constants.ENV.DEV || env === Constants.ENV.STAGING) {
    chainId = 11155111;
  }

  return `eip155:${chainId}:${address}`;
}

/**
 * This helper
 *  checks if a VALID CAIP
 *    return the CAIP
 *  else
 *    check if valid ETH
 *      return a CAIP representation of that address (EIP155 + env)
 *    else
 *      throw error!
 */
export function getCAIPAddress(env, address, msg = "") {
  console.log("getCAIPAddress", env, address);
  if (validateCAIP(address)) {
    return address;
  } else {
    if (isValidETHAddress(address)) {
      return getFallbackETHCAIPAddress(env, address);
    } else {
      throw Error(`Invalid Address! ${msg}`);
    }
  }
}

// P = Partial CAIP
export const walletToPCAIP10 = (account) => {
  if (account.includes("eip155:")) {
    return account;
  }
  return "eip155:" + account;
};

export const pCAIP10ToWallet = (wallet) => {
  wallet = wallet.replace("eip155:", "");
  return wallet;
};
