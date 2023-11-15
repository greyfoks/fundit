import React, {useState} from 'react'
import { Table, Button } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign';
import { useRouter } from 'next/router'


function RequestRow(props) {
    const { Row, Cell } = Table;
    const { id, request, address, approversCount } = props;
    const { description, value, recipient, approvalCount } = request;

    const [ errorMessage, setErrorMessage ] = useState('');
    const [ approveLoading, setApproveLoading]  = useState(false);
    const [ finalizeoading, setFinalizeoading]  = useState(false);


    const router = useRouter();

    const readyToFinalize = approvalCount > approversCount / 2;

    const onApprove = async () => {
        const campaign = Campaign(address);
        const accounts = await web3.eth.getAccounts();
        setApproveLoading(true)

        try {
        await campaign.methods.approveRequest(id).send({
            from: accounts[0]
        })  
        router.push(`/campaigns/${address}/requests`);
    } catch (err) {
        setErrorMessage(err.message)
    }
    setApproveLoading(false)
    }

    const onFinalize = async () => {
        const campaign = Campaign(address);
        const accounts = await web3.eth.getAccounts();
        setFinalizeoading(true)
        try {
        await campaign.methods.finalizeRequest(id).send({
            from: accounts[0]
        })  
        router.push(`/campaigns/${address}/requests`);

    } catch (err) {
        setErrorMessage(err.message)
    }
    setFinalizeoading(false)
    }

  return (
    <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
        <Cell>
            {id}
        </Cell>
        <Cell>
            {description}
        </Cell>
        <Cell>
            {web3.utils.fromWei(value, 'ether')}
        </Cell>
        <Cell>
            {recipient}
        </Cell>
        <Cell>
            {approvalCount}/{approversCount}
        </Cell>
        <Cell>
            { request.complete ? null : (
            <Button color="green" basic onClick={onApprove} loading={approveLoading}>Approve</Button>
            )
            }
        </Cell>
        <Cell>
        { request.complete ? null : (

            <Button color="red" basic onClick={onFinalize} loading={finalizeoading}>Finalize</Button>
        )
        }   
        </Cell>
    </Row>
  )
}

export default RequestRow;