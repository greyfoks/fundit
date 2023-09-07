import React, {useEffect} from 'react'
import factory from '../ethereum/factory'

export default function index() {

    useEffect(() => {
        async function fetchData() {
        //   const campaigns = await factory.methods.getDeployedCampaigns().call();
        }
     
        fetchData();
      }, []);

  return (
    <div>index</div>
  )
}
