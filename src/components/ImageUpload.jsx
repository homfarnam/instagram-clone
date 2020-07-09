import React, { useState } from 'react'
import './ImageUpload.css'
import { Button } from '@material-ui/core'
import {db,storage} from '../firebase'
import firebase from 'firebase'

function ImageUpload({username}) {
    const [caption,setCaption] =useState('')
    const [image,setImage] = useState(null)
    const [progress,setProgress] = useState(0)
    const [url,setUrl] = useState('')

    const handleChange = (e) =>{
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () =>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                // progress function
                const progress = Math.random(
                    (snapshot.bytesTransferred / snapshot.totalBytes) *100
                )

                setProgress(progress)
            },
            (error)=>{
                // Error function
                console.log(error)     
                alert(error.message)           
            },
            ()=>{
                // complete function
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL() 
                    .then(url=> {
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption:caption,
                            imageUrl:url,
                            username:username
                        })
                        setProgress(0)
                        setCaption('')
                        setImage(url)
                    })
            }
        )
    }

    return (
        <div className='progress'>
            <progress  value={progress} max='100' />
            <input type='text'
             value={caption} 
             placeholder='Enter a caption...' 
             onChange={event=> setCaption(event.target.value)} 
             />

            <input type='file' onChange={handleChange} />

            <Button className='imageupload__button' onClick={handleUpload}>
                Upload
            </Button>

        </div>
    )
}

export default ImageUpload
