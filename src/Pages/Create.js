import { Button } from '@mui/material';
import React from 'react'
import retPcontractAddress from "./retPcontractAddress"

export default function Create(){
    const [contractAddress, setContracAddress] = React.useState(false);


    return (
        <>
            <Button onClick={()=>{}}>createNFTContract</Button>
        </>
    )
}