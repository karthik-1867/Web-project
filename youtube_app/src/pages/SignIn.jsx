import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'
import {auth,provider} from './../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


const Container = styled.div`
    /* here "-" needs space  */
    height: calc(100vh - 56px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({theme})=>theme.bg};
`
const Wrapper = styled.div`
    width: 320px;
    background-color: ${({theme})=>theme.bgLighter};
    border : 1px solid ${({theme})=>theme.soft};
    padding: 33px 20px;
    color: ${({theme})=>theme.text};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const SignInText = styled.h1`
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 10px;
    color: ${({theme})=>theme.text};
`
const NormalText = styled.span`
    font-size: 23px;
    color: ${({theme})=>theme.text};
    margin-bottom: 10px;
    font-weight: 400;
`
const SignInInput = styled.input`
    padding: 10px 10px;
    width: 70%;
    margin-bottom: 10px;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid ${({theme})=>theme.soft};
`

const Button = styled.div`
    height: fit-content;
    padding: 10px 15px;
    color: ${({theme})=>theme.textSoft};
    background-color: ${({theme})=>theme.soft};
    border-radius: 4px;
    font-weight: 500;
`


export default function SignIn() {

 const [name,setName] = useState("");
 const [email,setEmail] = useState("");
 const [pass,setPass] = useState("")
 const dispatch = useDispatch()
 const navigate = useNavigate()

 const handleLogin =async(e)=>{
   e.preventDefault()
   console.log("clicked")
  dispatch(loginStart())
   try{
     
     const ress = await axios.post("/auth/signin",{name,"password":pass})
     console.log(ress.data);
     dispatch(loginSuccess(ress.data));
     navigate("/");
   }catch(e){
     dispatch(loginFailure());
   }

   console.log(name+pass+email)
 }

 const signInWithGoogle = async(e) =>{
   signInWithPopup(auth,provider).then((result)=>{
   dispatch(loginStart());
   console.log(JSON.stringify(result.user))
    axios.post("/auth/googleAuth",{
      name:result.user.displayName,
      email:result.user.email,
      img:result.user.photoURL
    }).then((res)=>{
      dispatch(loginSuccess(res.data))
      navigate("/")
    })
    .catch((err)=>{dispatch(loginFailure())});
   
  
  }).catch((err)=>{console.log("aufg"+err)})
 }

  return (
    <Container>
        <Wrapper>
          <SignInText>Sign In</SignInText>
          <NormalText>to continue to KartTube</NormalText>
          <SignInInput placeholder='username' onChange={(e)=>setName(e.target.value)}/>
          <SignInInput placeholder='password' onChange={(e)=>setPass(e.target.value)}/>
          <Button onClick={handleLogin}>Sign In</Button>
          <NormalText>or</NormalText>
          <Button onClick={signInWithGoogle}>Sign in with Google</Button>
          <NormalText>or</NormalText>
          <SignInInput placeholder='username' onChange={(e)=>setName(e.target.value)}/>
          <SignInInput placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
          <SignInInput placeholder='password' onChange={(e)=>setPass(e.target.value)}/>
          <Button onClick={handleLogin}>Sign Up</Button>
        </Wrapper>
    </Container>
  )
}
