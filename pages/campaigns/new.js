import React, { useState } from 'react'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { useRouter } from 'next/router'

function CampaignNew() {

    const [ minimumContribution, setMinimumContribution ] = useState(0);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ loading, setLoading]  = useState(false);
    const router = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setErrorMessage('');

        try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods.createCampaign(minimumContribution)
            .send({
                from: accounts[0]
            });

        router.push('/');
        
        } catch (err) {
            setErrorMessage(err.message);
        }

        setLoading(false);
    }

  return (
    <div>
        <h3> New Campaign</h3>
        <Form onSubmit={onSubmit} error={!!errorMessage}> 
            <Form.Field>
                <label>Minimum Contribution</label>
                <Input label='wei' labelPosition='right' value={minimumContribution} onChange={event => setMinimumContribution(event.target.value)}/>
            </Form.Field>
            <Message error header={'Oops!'} content={errorMessage} />
            <Button primary loading={loading}> Create </Button>
        </Form>
    </div>

  )
}


export default CampaignNew;