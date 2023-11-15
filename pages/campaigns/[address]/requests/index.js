import React from 'react'
import Link from 'next/link'
import { Button, Tab, Table } from 'semantic-ui-react'
import Campaign from '../../../../ethereum/campaign'
import web3 from '../../../../ethereum/web3'
import RequestRow from '../../../../components/RequestRow'

function RequestIndex(props) {

  const { Header, Row, HeaderCell, Body } = Table;
  const { requests, approversCount} = props;
  console.log(props.requestCount)

  const renderRows = () => {
    return props.requests.map((request, index) => {
      return <RequestRow key={index} id={index} request={request} approversCount={approversCount} address={props.address}/>;
    })
  }

  return (
    <div>
      <h3>Request List</h3>
      <Link href={{
        pathname: '/campaigns/[address]/requests/new',
        query: { address: props.address }
      }}>
        <Button primary floated='right' style={{marginBottom: '10px'}}>Add Request</Button>
      </Link>

      <Table celled>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {renderRows()}
        </Body>
      </Table>
      <div>Found {props.requestCount ? props.requestCount : 0} requests.</div>
    </div>
  )
}

RequestIndex.getInitialProps = async (context) => {
  const { query: { address = '' } } = context;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  let requests = [];

  if (parseInt(requestCount) > 0) {
  requests = await Promise.all(
    Array(parseInt(requestCount)).fill().map(async (item, index) =>  {
      const currentCampaign = await campaign.methods.requests(index).call();

      return {
        description: currentCampaign[0],
        value: currentCampaign[1].toString(),
        recipient: currentCampaign[2],
        complete: currentCampaign[3],
        approvalCount: currentCampaign[4].toString()
      }
    })
  )
  }


  return {
      address: address.toString(),
      requests: requests,
      requestCount: requestCount.toString(),
      approversCount: approversCount.toString()
  }
}

export default RequestIndex;