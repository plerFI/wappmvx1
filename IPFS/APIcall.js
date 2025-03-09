const { ethers } = require('ethers');
const axios = require('axios');

const STABLECOINS = ['USDC', 'USDbC', 'DAI', 'USDT', 'MAI', 'msUSD', 'eUSD', 'LUSD', 'Bold'];
const CONTRACT_ADDRESS = '0x175fD51BA7fE09c7dFfe857ebb99A2F15dE9a858';
const CONTRACT_ABI = [{"inputs":[{"internalType":"string","name":"_vaultName","type":"string"},{"internalType":"string","name":"_chain","type":"string"},{"internalType":"string","name":"_version","type":"string"},{"internalType":"address","name":"_usdc","type":"address"},{"internalType":"address[3]","name":"_bestVaults","type":"address[3]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"grossAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"depositFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"netAmount","type":"uint256"}],"name":"Deposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"depositFeeBP","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"withdrawFeeBP","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"performanceFeeBP","type":"uint256"},{"indexed":false,"internalType":"address","name":"feeRecipient","type":"address"}],"name":"FeeParametersUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"panicState","type":"bool"}],"name":"PanicStateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"status","type":"bool"}],"name":"PanicWhitelistUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"totalProfit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"performanceFee","type":"uint256"}],"name":"PerformanceFeeTaken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[3]","name":"newVaults","type":"address[3]"}],"name":"VaultsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"grossAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"withdrawFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"performanceFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"netAmount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address[3]","name":"newVaults","type":"address[3]"}],"name":"migrateAllVaults","outputs":[],"stateMutability":"nonpayable","type":"function"}];

module.exports = async function(taskArgs, gelatoArgs) {
  const provider = new ethers.JsonRpcProvider(gelatoArgs.rpcUrl);
  const wallet = new ethers.Wallet(gelatoArgs.privateKey, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

  try {
    const [{ data: vaults }, { data: apys }] = await Promise.all([
      axios.get('https://api.beefy.finance/vaults'),
      axios.get('https://api.beefy.finance/apy'),
    ]);

    const baseStableVaults = vaults.filter(vault => {
      if (vault.network !== 'base' || vault.status !== 'active') return false;
      if (vault.assets && vault.assets.length === 2) {
        return vault.assets.every(asset => STABLECOINS.includes(assetSymbol(asset)));
      } else {
        return STABLECOINS.includes(vault.token);
      }
    });

    const enrichedVaults = baseStableVaults.map(vault => ({
      ...vault,
      apy: apys[vault.id] || 0,
    }));

    enrichedVaults.sort((a, b) => b.apy - a.apy);

    const top3Vaults = enrichedVaults
      .slice(0, 3)
      .map(vault => vault.earnContractAddress);

    if (top3Vaults.length !== 3) {
      throw new Error("Less than 3 valid vaults found");
    }

    // Ruft migrateAllVaults in deinem Contract auf
    const tx = await contract.migrateAllVaults(top3Vaults);
    await tx.wait();

    return { txHash: tx.hash, migratedVaults: top3Vaults };
  } catch (error) {
    console.error('Gelato Fehler:', error);
    return { error: error.message };
  }
};

function assetSymbol(asset) {
  return typeof asset === 'string' ? asset : asset.symbol;
}
