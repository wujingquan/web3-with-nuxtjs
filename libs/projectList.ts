import web3 from './web3';
import ProjectList from '../compiled/ProjectList.json';
import address from '../adddress';

const contract = new web3.eth.Contract(ProjectList.abi, address);
console.log('contract', contract)

export default contract;