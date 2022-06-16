import { Button, Card, CardContent, CardMedia, Input, Paper, Typography } from '@mui/material';
import React from 'react'
import Login from './Login';
import { ethers } from 'ethers';

import contractAbi from '../SmartContract/contractAbi';
import contractAddress from '../SmartContract/contractAddress';
import { create } from 'ipfs-http-client';

const ipfsAddress = 'http://127.0.0.1:5001';

export default function Create(props) {

    const client = create(ipfsAddress);

    const ethereum = window.ethereum;

    // to show local Image 
    const [imgFile, setImgFile] = React.useState(null);
    const [inputs, setInputs] = React.useState({image: null, name:null, externalLink: null, description: null, collection: null, trait_type: null, value: null});

    const handleImgChange = (e)=>{
        const curImgFile = e.target.files[0];
        // console.log(curImgFile);
        const reader = new FileReader();
        reader.onload = function() {
            setImgFile(reader.result);
        }
        setInputs({...inputs, ['image']: curImgFile});
        reader.readAsDataURL(curImgFile);
    }

    // ipfs 메타데이터 생성 함수들
    const submitImage = async (infoObject) => {
        const image = inputs['image'];
        if(!image) return false;
        try{
          let added = await client.add(
            image,
            {
              progress: (prog) => console.log(`received: ${prog}`)
            }
          )
          const url = `https://ipfs.infura.io/ipfs/${added.path}`;
          console.log(url)
          return uploadMetaData(url,infoObject)
        }catch(e){
          console.log(e)
        }
      }
    
      const uploadMetaData = async (url,infoObject) => {
        const {name, externalLink, description, trait_type, value} = infoObject;
        const jsonData = {
          "name": name,
          "description": description,
          "image": url,
          "attributes": [
            {
              "trait_type": trait_type,
              "value": value
            }
          ]
        }
    
        const jsonblob = new Blob([JSON.stringify(jsonData)], {type:'application/json'})
        const jsonFile =  new File([jsonblob], 'data.json')
        try{
          let added = await client.add(
            jsonFile,
            {
              progress: (prog) => console.log(`received: ${prog}`)
            }
          )
          return `https://ipfs.infura.io/ipfs/${added.path}?filename=${added.path}`;
          
        }
        catch(e){
          console.log(e)
        }
      }
    //   ipfs 메타데이터 생성 함수들


    const handleClickCreate = async ()=>{
        if((inputs.name == null || inputs.image == null)) { console.log('input is not sain'); return false; }

        const myContractWithSigner = await provider.send("eth_requestAccounts", []).then( _=>provider.getSigner()).then(signer=>myContract.connect(signer));

        myContractWithSigner.functions.mintNFT(ethereum.selectedAddress, submitImage(inputs));
        myContract.name().then(console.log);
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const myContract = new ethers.Contract(contractAddress, contractAbi, provider);
    
    


    return (
        <>
            {props.isLogined ?
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h4' component='div' gutterBottom>Create New Item</Typography>
                    <div>*Required fields</div>
                    <div>Image, Video, Audio, or 3D Model *</div>
                    <div>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</div>
                    <Card>
                        <CardContent >
                            <CardMedia
                                component="img"  
                                image={imgFile}  
                                height="335"
                            />

                            <input
                                type='file'
                                onChange={handleImgChange}
                            />
                        </CardContent>
                    </Card>
                    <div>Name *</div>
                    <Input onChange={ (e)=>setInputs({...inputs,['name']: e.target.value}) }></Input>
                    <div>External link</div>
                    <Input onChange={ (e)=>setInputs({...inputs,['externalLink']: e.target.value}) }></Input>
                    <div>Description</div>
                    <Input onChange={ (e)=>setInputs({...inputs,['description']: e.target.value}) }></Input>
                    <div>Collection</div>
                    <Input onChange={ (e)=>setInputs({...inputs,['collection']: e.target.value}) }></Input>
                    <div>Attributes</div>
                    <div>trait_type</div>
                    <Input onChange={ (e)=>setInputs({...inputs,['trait_type']: e.target.value}) }></Input>
                    <div>value</div>
                    <Input onChange={ (e)=>setInputs({...inputs,['value']: e.target.value}) }></Input>
                    <Button onClick={handleClickCreate}>Create</Button>
                    <Button onClick={()=>{console.log(inputs)}}>HI</Button>
                
                </div>




                : <Login />}
        </>
    )
}
