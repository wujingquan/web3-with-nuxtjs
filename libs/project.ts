import web3 from './web3';
import Project from '../compiled/Project.json';

const getContract = (address: string) => new web3.eth.Contract(Project.abi, address);
export default getContract;