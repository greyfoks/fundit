import React from 'react'
import ExistingCampaign from '../../ethereum/campaign'
import { Card, Grid, Button } from 'semantic-ui-react'
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/ContributeForm'
import Link from 'next/link'


function Campaign(props) {

    const renderCards = () => {
        const { balance, manager, minimumContribution, requestsCount, approversCount } = props;
        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'This manager created this campaign and can create requests to withdraw money.',
                style: { overflowWrap: 'break-word' },
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver.',
                style: { overflowWrap: 'break-word' },
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
                style: { overflowWrap: 'break-word' },
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign.',
                style: { overflowWrap: 'break-word' },
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend.',
                style: { overflowWrap: 'break-word' },
            },
        ];

        return <Card.Group items={items} />;
    }

    return (
        <div>
            <h3> Campaign Details </h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {renderCards()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={props.address} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Link href={{
                            pathname: '/campaigns/[address]/requests',
                            query: { address: props.address }
                        }}>
                            <Button primary>View Requests</Button>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>

    )
}

Campaign.getInitialProps = async (context) => {
    const { query: { address = '' } } = context;
    const campaign = ExistingCampaign(address)

    const summary = await campaign.methods.getSummary().call();

    return {
        address: address,
        minimumContribution: summary[0].toString(),
        balance: summary[1].toString(),
        requestsCount: summary[2].toString(),
        approversCount: summary[3].toString(),
        manager: summary[4].toString(),
    }
}

export default Campaign;