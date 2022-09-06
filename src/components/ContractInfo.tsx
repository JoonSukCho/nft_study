import React, { useEffect, useState } from "react";

const ContractInfo = ({ contract }: any) => {
  const [ctInfo, setCtInfo] = useState({
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
          mintIndexForSale: Number(mintIndexForSale),
          mintLimitPerBlock: Number(mintLimitPerBlock),
          mintStartBlockNumber: Number(mintStartBlockNumber),
          maxSaleAmount: Number(maxSaleAmount),
          mintPrice: Number(mintPrice),
        });
      }
    })();
  }, [contract]);

  return (
    <div>
      <p>{`민트 카운트 : ${ctInfo.mintIndexForSale - 1} / ${
        ctInfo.maxSaleAmount
      }`}</p>
      <p>{`트랜잭션당 최대 수량 : ${ctInfo.mintLimitPerBlock} 개`}</p>
      <p>{`민팅 시작 블록 : #${ctInfo.mintStartBlockNumber}`}</p>
      <p>{`민팅 가격 : ${window.caver.utils.convertFromPeb(
        ctInfo.mintPrice
      )} KLAY`}</p>
    </div>
  );
};

export default ContractInfo;
