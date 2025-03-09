const axios = require('axios');

const STABLECOINS = ['USDC', 'USDbC', 'DAI', 'USDT', 'MAI', 'msUSD', 'eUSD', 'LUSD', 'Bold'];

async function getTop3StablecoinVaults() {
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
  
      const top3Vaults = enrichedVaults.slice(0, 3).map(vault => ({
        id: vault.id,
        name: vault.name,
        apy: vault.apy,
        token: vault.token,
        vaultAddress: vault.earnContractAddress,
      }));
  
      console.log('🔸 Top 3 aktive Stablecoin-Vaults auf Base:');
      console.table(top3Vaults);
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
    }
  }
  
  function assetSymbol(asset) {
    return typeof asset === 'string' ? asset : asset.symbol;
  }
  
  getTop3StablecoinVaults();