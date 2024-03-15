import React from 'react';
import { Button } from 'antd';
import { signOut } from 'next-auth/react';

export default function Logout() {

    return (
        <Button onClick={signOut}>Sair</Button>
    )
}