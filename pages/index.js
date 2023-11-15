import React from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Link from 'next/link'

function index(props) {

    const renderCampaign = () => {
        const items = props.campaigns.map(address => {
            return {
                header: address,
                description: <Link href={{
                    pathname: '/campaigns/[address]',
                    query: { address: address }
                }}>View Campaign</Link>,
                fluid: true
            }
        });

        return <Card.Group items={items} />;
    }

    const router = useRouter();


  return (
    <div>
        <h3>Open Campaigns</h3>
        <Button floated='right' content="Create Campaign" icon="add circle" primary onClick={(() => router.push('/campaigns/new'))} />
        {renderCampaign()}

    </div>
  )
}

index.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns }
}

export default index;