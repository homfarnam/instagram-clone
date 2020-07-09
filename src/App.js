import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/post';
import {db,auth} from './firebase'
import { Modal, Button, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageUpload from './components/ImageUpload';

function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {

  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [user,setUser]=useState(null)
  const [openSignIn,setOpenSignIn] = useState(false)

  useEffect(()=>{
    const unsubscribe =auth.onAuthStateChanged((authUser)=>{
      if(authUser){
          // user has logged in
          console.log(authUser);
          setUser(authUser)
          
      }else{
          // user has logged out
          setUser(null)
      }

      return () =>{
        // perform some cleanup
        unsubscribe()
      }
    })
  },[user,username])


  useEffect(()=>{
    db.collection('posts')
    // every time a new post is added 
      .onSnapshot(snapshot=>{
          setPosts(snapshot.docs.map(doc=>({
            id:doc.id,
            post:doc.data()
          })))
      })
  },[])

  
  const classes = useStyles();


 

  const signUp = (event)=>{
    event.preventDefault()
    auth
      .createUserWithEmailAndPassword(email,password)
      .then((authUser)=> {
        return authUser.user.updateProfile({
          displayName:username
        })
      })
      .catch((err)=> alert(err.message))
  }

  const signIn = (event) =>{
    event.preventDefault()

    auth
      .signInWithEmailAndPassword(email,password)
      .catch(err=> alert(err.message))

    setOpenSignIn(false)
  }
  
  return (
    <div className="app">
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ): (
        <h3>Sorry you need to login to upload!</h3>
      )}

      <Modal
        open={open}
        onClose={()=> setOpen(false)}>

         <div style={modalStyle} className={classes.paper}>
         <form className='app__signup'>
           <center>
              <img 
              src="https://pngimage.net/wp-content/uploads/2018/06/scritta-instagram-png-.png" 
              alt="" 
              className="app__headerImage"/>
            </center>
            
                <Input
                    placeholder='username'
                    type='text'
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    />  

                    <Input
                    placeholder='email'
                    type='text'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />

                    <Input
                    placeholder='password'
                    type='password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                    
                    <Button onClick={signUp}> Sign Up </Button>
           </form>
           
         </div>

      </Modal>



      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}>

         <div style={modalStyle} className={classes.paper}>
         <form className='app__signup'>
           <center>
              <img 
              src="https://pngimage.net/wp-content/uploads/2018/06/scritta-instagram-png-.png" 
              alt="" 
              className="app__headerImage"/>
            </center>
            
                    <Input
                    placeholder='email'
                    type='text'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />

                    <Input
                    placeholder='password'
                    type='password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                    
                    <Button onClick={signIn}> Sign In </Button>
           </form>
           
         </div>

      </Modal>


        <div className="app__header">
          <img 
          className='app__headerImage'
          src='https://pngimage.net/wp-content/uploads/2018/06/scritta-instagram-png-.png'
           alt="instagram"/>
        </div>

        {user? (<Button onClick={()=> auth.signOut()}> Log out </Button>):(
          <div className="app__loginContainer">
              <Button onClick={()=> setOpenSignIn(true)}> Sign In </Button>
              <Button onClick={()=> setOpen(true)}> Sign Up </Button>
          </div>
         
        )}

        <h1>Farnam</h1>

        {
          posts.map(({id,post})=>{
            return(
              <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            )
          })
        }

        {/* <Post username='farnam' caption='it works' imageUrl='https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80' />
        <Post username='faraeeen' caption='it works 2' imageUrl='https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80'/> */}
    </div>
  );
}

export default App;
