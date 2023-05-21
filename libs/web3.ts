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
import Web3 from 'web3';

let web3;
// 浏览器环境且已经安装了 Metamask
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);

  // 服务器环境或者没有安装 Metamask
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
}

export default web3;