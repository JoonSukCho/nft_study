import React, { useEffect, useState } from "react";
import { connectWallet } from "../utils/klaytn";

const Wallet = ({ account, setAccount }: any) => {
  const [balance, setBalance] = useState("");

  const clickHandler = async () => {
    const accounts = await connectWallet();
    console.log(accounts);
    setAccount(accounts[0]);
  };

  useEffect(() => {
    if (account) {
      (async () => {
        const peb = await window.caver.klay.getBalance(account);
        setBalance(Number(window.caver.utils.convertFromPeb(peb)).toFixed(6));
      })();
    }
  }, [account]);

  return (
    <div>
      <button onClick={clickHandler}>지갑 연결하기</button>
      {account && (
        <div>
          <p>{`지갑 주소 : ${account}`}</p>
          <p>{`보유 KLAY : ${balance} KLAY`}</p>
        </div>
      )}
    </div>
  );
};

export default Wallet;
