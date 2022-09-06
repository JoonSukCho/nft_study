import React, { useState, useEffect } from "react";
import "./App.css";
import ContractInfo from "./components/ContractInfo";
import PublicMint from "./components/PublicMint";
import Wallet from "./components/Wallet";
import { createContract, hasKaikas } from "./utils/klaytn";

declare global {
  interface Window {
    klaytn: any;
    caver: any;
  }
}

function App() {
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [blockNumber, setBlockNumber] = useState(undefined);

  // contract 설정
  useEffect(() => {
    (async () => {
      const myContract = await createContract();
      setContract(myContract);
    })();
  }, []);

  // block count
  useEffect(() => {
    setInterval(() => {
      window.caver.klay.getBlockNumber().then((res) => {
        setBlockNumber(res);
      });
    }, 500);
  }, []);

  return (
    <div className="App">
      <main>
        {hasKaikas() ? (
          <>
            <h1>{blockNumber && `Block Number : #${blockNumber}`}</h1>
            <Wallet account={account} setAccount={setAccount} />
            <hr />
            {contract && <ContractInfo contract={contract} />}
            {account && contract && (
              <PublicMint
                account={account}
                contract={contract}
                blockNumber={blockNumber}
              />
            )}
          </>
        ) : (
          <div>카이카스 지갑을 먼저 설치해</div>
        )}
      </main>
    </div>
  );
}

export default App;
