import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
require('dotenv').config({path:'../.env'})

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x669d6956c5fda0d8f0a02dbaf022d385dc5bfa37'
);
 
export default instance;