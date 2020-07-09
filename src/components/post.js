import React from 'react'
import './post.css'
import Avatar from '@material-ui/core/Avatar'

function post({username,caption,imageUrl}) {
    
    return (
        <div className='post'>
            <div className="post__header">
                <Avatar
                className='post__avatar'
                alt='farnam'
                src='/static/images/farnam.jpg'
                />
                 <h3>{username}</h3>
            </div>
            
           
            {/* header -> avatar and user name */}

            {/* image */}
            <img 
            className='post__image'
            src={imageUrl}
             alt=""
             
             />

            <h4 className='post__text'><strong>{username}</strong> {caption}</h4>
            {/* username and caption */}
        </div>
    )
}

export default post
