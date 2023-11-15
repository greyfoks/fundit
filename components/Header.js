import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useRouter } from 'next/router'


export default () => {
    const router = useRouter();

    const handleClick = (path) => {
        router.push(path)
    }

    return (
        <Menu style={{marginTop: '10px'}}>
            <Menu.Item content='Fundit' />

            <Menu.Menu position="right">
                <Menu.Item content='Campaigns' onClick={() => handleClick('/')}/>
                <Menu.Item content='+' onClick={() => handleClick('/campaigns/new')}/>
            </Menu.Menu>
        </Menu>
    )
}