import { ABI, CONTRACT_ADDRESS } from "../klaytnConfig";

export const hasKaikas = () => {
  return window.klaytn && window.caver;
};

export const connectWallet = async () => {
  return await window.klaytn.enable();
};

export const createContract = async () => {
  return await new window.caver.klay.Contract(ABI, CONTRACT_ADDRESS);
};
