import { writable } from 'svelte/store';
import { contractsAbi } from "./contractsAbi";
//TRUFFLE
// export const EggToken = "0x574bb6d18b578D37A6BB79ca2cfb9F5a1d1AC930"
// export const Marketplace = "0x05F7B04E8ED850A6377Cfdc7Bc19aFAa7404437E"
// export const DragonToken = "0x67063dAE4042627040eEb997c17A7EAFCED2592F"
// export const DnaToken = "0xD63616AE389317fB53275b18333b1A231F26bD68"
// export const LoanBook = "0xeC5712cCEFC64eBf00865fE3229dC3a7e7c17170"
//TESTNET
export const EggToken = "0x9D6B0921128740E02535e3df5A94d60E731Bc548"
export const Marketplace = "0xa00550970b613Af8775B1b6A6A437E69e084104A"
export const DragonToken = "0x1f113ef3af96b71F01a7bbA446b41f032f10925d"
export const DnaToken = "0xDe57d8A8390a82770282518817d0FceECBd44ff6"
export const LoanBook = "0x5fcccDd512b3e18648F0A85fEAa0e8bdd4826989"

export const balances = writable({ contract: 0,user: 0 });

export async function contracts() {
    
    let account = web3.currentProvider.selectedAddress;

    let Egg_instance = new web3.eth.Contract(contractsAbi.EggToken, EggToken, {
        from: account,
    });

    let Dragon_instance = new web3.eth.Contract(contractsAbi.DragonToken, DragonToken, {
        from: account,
    });

    let Dna_instance = new web3.eth.Contract(contractsAbi.DnaToken, DnaToken, {
        from: account,
    });

    let marketplace_instance = new web3.eth.Contract(contractsAbi.Marketplace, Marketplace, {
        from: account,
    });

    let loanbook_instance = new web3.eth.Contract(contractsAbi.LoanBook, LoanBook, {
        from: account,
    });

    let address = {
        EggToken:EggToken,
        DragonToken:DragonToken,
        Marketplace:Marketplace,
        DnaToken:DnaToken,
        LoanBook:LoanBook        
    }
    
    let contractData = {              
        address:address,
        account: account,
        EggToken:Egg_instance,
        DragonToken:Dragon_instance,
        DnaToken:Dna_instance,
        Marketplace:marketplace_instance,
        LoanBook:loanbook_instance
    } 

    return contractData

}

export const updateBalances = async (dappBalance,userBalance) => {

    balances.update(value =>{
        value = { contract: dappBalance,user: userBalance }      
        return value
    }  )  

}