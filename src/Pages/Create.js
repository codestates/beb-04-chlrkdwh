import React, { useState } from 'react'
import {create} from 'ipfs-http-client'
import {Button} from '@mui/material'


export default function Create() {
  const [image, setImage] = useState({});

  //ipfs
  const client = create('http://127.0.0.1:5001')
  
  const handleFile = (e) => {
    console.log(e.target.files[0])
    setImage(e.target.files[0])
  }

  const submitImage = async() => {
    try{
      let added = await client.add(
        image,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url)
      uploadMetaData(url)
    }catch(e){
      console.log(e)
    }
  }

  const uploadMetaData = async (url) => {
    const jsonData = {
      "name": "name #1",
      "description": "description",
      "image": url,
      "attributes": [
        {
          "trait_type": "Background",
          "value": "White"
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
      const jsonUrl = `https://ipfs.infura.io/ipfs/${added.path}?filename=${added.path}`;
      console.log(jsonUrl)
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <div>
      <input type='file' id='image' onChange={handleFile}/>
      <Button onClick={submitImage}>submit</Button>
    </div>
  )
}
