import React, { useState } from 'react'
import { Form, Input, Button, Message } from 'semantic-ui-react'
import Campaign from '../../../../ethereum/campaign'
import web3 from '../../../../ethereum/web3'
import Link from 'next/link'
import { useRouter } from 'next/router'


function NewRequest(props) {

    const [ value, setValue ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ recipient, setRecipient ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ loading, setLoading]  = useState(false);
    const router = useRouter();


    const onSubmit = async (event) => {
        event.preventDefault();

        const campaign = Campaign(props.address);

        setLoading(true)
        setErrorMessage('')

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
                .send({
                    from: accounts[0]
                })
                router.push(`/campaigns/${props.address}/requests`);

        } catch (err) {
            setErrorMessage(err.message)
        }

        setLoading(false)
        setValue('')
    }

  return (
    <div>
          <Link href={{
        pathname: '/campaigns/[address]/requests',
        query: { address: props.address }
      }}>
        Back
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
            <label>Description</label>
            <Input 
                value={description}
                onChange={event => setDescription(event.target.value)}
            />
        </Form.Field>
        <Form.Field>
            <label>Value in Ether</label>
            <Input
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </Form.Field>
        <Form.Field>
            <label>Recipient</label>
            <Input 
                value={recipient}
                onChange={event => setRecipient(event.target.value)}
            />
        </Form.Field>
        <Message error header='Oops!' content={errorMessage} />
        <Button primary loading={loading}>Create</Button>
      </Form>
    </div>
  )
}

NewRequest.getInitialProps = async (context) => {
    const { query: { address = '' } } = context;
  
    return {
        address: address
    }
  }

export default NewRequest;