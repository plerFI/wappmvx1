import React from "react";

function Docs() {
  const renderText = (text: string) => {
    return text.trim() ? (
      <p className="text-themeWhite font-Poppins text-sm font-normal">{text}</p>
    ) : null;
  };

  const renderHeading = (text: string, level: number) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return (
      <Tag className="text-themeGreen/80 font-Poppins uppercase tracking-widest font-semibold mt-5">
        {text}
      </Tag>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      {renderHeading("Documentation / Q&A", 1)}

      {renderHeading("What is AuctOZ?", 3)}
      {renderText(
        `AuctOZ acts as a delegator between the 3 best Beefy Pools. 
        The goal is to always deposit your money in the best pool and thereby get the maximum return. 
        AuctOZ is a project that is constantly being improved. The design has been kept simple and straightforward 
        for the beginning in order to make the functions available as quickly as possible.`
      )}

      {renderHeading("Who is AuctOZ intended for?", 4)}
      {renderText(
        `AuctOZ is for everyone who uses Beefy and/or wants to invest their USDC 
        as simply and quickly as possible over the long term. Since AuctOZ only uses selected 
        and stablecoin pools, there is a high level of security.`
      )}

      {renderHeading("How does AuctOZ work?", 5)}
      {renderText(
        `Behind AuctOZ is a smartcontract wich interacts with the Beefy strategy.
        AuctOZ automaticly searches for the best pools and delegates the usdc to them. `
      )}

      {renderHeading("What is the fee structure of AuctOZ?", 6)}
      {renderText("AuctOZ does not pursue any financial interest. There is only one fee.")}
      {renderText(
        `○ The performance fee of AuctOZ, which is set at 5% at the start. 
        The sole purpose of this fee is to offset the server and gas cost.`
      )}
      {renderText(
        `The motto of this fee is; the higher the volume, the lower the fee! 
        As soon as the costs are covered, the fee will be adjusted.`
      )}
    </div>
  );
}

export default Docs;