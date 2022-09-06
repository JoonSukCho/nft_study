import React, { useState, useEffect } from "react";
import BigNumber from "big-number";

const PublicMint = ({ account, contract, blockNumber }: any) => {
  const [ctInfo, setCtInfo] = useState({
    isCtInfo: false,
    mintIndexForSale: 0,
    mintLimitPerBlock: 0,
    mintStartBlockNumber: 0,
    maxSaleAmount: 0,
    mintPrice: 0,
  });

  useEffect(() => {
    (async () => {
      if (contract) {
        const contractInfo = await contract.methods.mintingInformation().call();
        const [
          _,
          mintIndexForSale,
          mintLimitPerBlock,
          __,
          mintStartBlockNumber,
          maxSaleAmount,
          mintPrice,
        ] = contractInfo;

        setCtInfo({
          isCtInfo: true,
          mintIndexForSale: Number(mintIndexForSale),
          mintLimitPerBlock: Number(mintLimitPerBlock),
          mintStartBlockNumber: Number(mintStartBlockNumber),
          maxSaleAmount: Number(maxSaleAmount),
          mintPrice: Number(mintPrice),
        });
      }
    })();
  }, [contract]);

  const clickHandler = async () => {
    if (!ctInfo.isCtInfo) {
      alert("아직 Contract 정보가 없어");
      return;
    }

    if (ctInfo.maxSaleAmount + 1 <= ctInfo.mintIndexForSale) {
      alert("모든 물량이 소진됨");
      return;
    }

    if (blockNumber <= ctInfo.mintStartBlockNumber) {
      alert("아직 민팅 시작 시간이 안됨");
      return;
    }

    const amount = ctInfo.mintLimitPerBlock;
    const totalValue = window.caver.utils.toBN(amount * ctInfo.mintPrice);
    console.log("totalValue", totalValue);

    try {
      const gasAmount = await contract.methods.publicMint(amount).estimateGas({
        from: account,
        gas: 6000000,
        value: totalValue,
      });

      const result = await contract.methods.publicMint(amount).send({
        from: account,
        gas: gasAmount,
        value: totalValue,
      });

      if (result !== null) {
        console.log(result);
        alert("민팅 성공!");
      }
    } catch (error) {
      console.log(error);
      alert("민팅 실패!");
    }
  };

  return (
    <div>
      <button onClick={clickHandler}>민팅하기</button>
    </div>
  );
};

export default PublicMint;
