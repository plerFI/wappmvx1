import React, { useEffect } from "react";

const RubicWidget = () => {
  useEffect(() => {
    const scriptHead = document.createElement("script");
    scriptHead.type = "text/javascript";
    scriptHead.src = "https://new-widgets.rubic.exchange/iframe/bundle.new-app.min.js";
    document.head.appendChild(scriptHead);

    const scriptBody = document.createElement("script");
    scriptBody.type = "text/javascript";
    scriptBody.defer = true;
    scriptBody.innerHTML = `
      var configuration = {
        from: 'ETH',
        to: 'usdc',
        fromChain: 'ETH',
        toChain: 'BASE',
        amount: 1,
        iframe: 'true',
        hideSelectionFrom: false,
        hideSelectionTo: true,
        hideTokenSwitcher: false,
        theme: 'dark',
        injectTokens: {},
        slippagePercent: {
          instantTrades: 2,
          crossChain: 5
        },
        crossChainIntegratorAddress: '',
        onChainIntegratorAddress: '',
        whitelistOnChain: [],
        blacklistOnChain: [],
        whitelistCrossChain: [],
        blacklistCrossChain: []
      };
      Object.freeze(configuration);
      rubicWidget.init(configuration);
    `;
    document.body.appendChild(scriptBody);

    return () => {
      document.head.removeChild(scriptHead);
      document.body.removeChild(scriptBody);
    };
  }, []);

  return <div id="rubic-widget-root" />;
};

export default RubicWidget;
