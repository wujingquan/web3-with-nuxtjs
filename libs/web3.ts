import Web3 from 'web3'
// This function detects most providers injected at window.ethereum.
import detectEthereumProvider from '@metamask/detect-provider';

// This returns the provider, or null if it wasn't detected.
// const provider = await detectEthereumProvider();
// console.log('provider', provider)


// if (provider) {
//   // From now on, this should always be true:
//   // provider === window.ethereum
//   startApp(provider); // initialize your app
// } else {
//   console.log('Please install MetaMask!');
// }
// let web3


// if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
//   web3 = new Web3(window.web3.currentProvier)
// } else {
//   web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/CqCd0QgCozHBEk19ub2M'))
console.log('123123123')
// }

let web3
// console.log('window1111111', window)
// if (provider && window !== 'undefined') {
//   if (provider !== window.ethereum) {
//     console.error('Do you have multiple wallets installed?');
//   } else {
//     web3 = new Web3(provider)
//   }
// } else {
//   web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/CqCd0QgCozHBEk19ub2M'))
// }
console.log('444444444444')
if (typeof window !== 'undefined') {
  console.log('abc')
  const provider = await detectEthereumProvider();
  if (provider) {
    if (provider === window.ethereum) {
      web3 = new Web3(provider)
    } else {
      console.error('Do you have multiple wallets installed?');
    }
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/2d0eee03a6e64721a50658bfb2fa28cf'))  
  }
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/2d0eee03a6e64721a50658bfb2fa28cf'))
}

export default web3