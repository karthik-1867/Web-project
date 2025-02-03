import { AccountCircleOutlined, SearchOutlined, VideoCallOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Upload from './Upload';
import { logout } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
    background-color: ${({theme})=>theme.bgLighter};
    border-bottom: 1px solid ${({theme})=>theme.soft};
    height: 56px;
    padding: 5px 5px;
`
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    position: relative;
`
const Search = styled.div`
    display: flex;
    align-items: center;
    background-color: transparent;
    width: 40%;
    background-color: ${({theme})=>theme.soft};
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    padding: 10px 10px;
    border-radius: 40px;
    justify-content: space-between;
    border: 1px solid #ccc;
`
const Input = styled.input`
    background-color: transparent;
    border: none;

    :focus{
        outline: none;
    }
`
const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border-radius: 3px;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    font-weight: 300;
    display: flex;
    align-items: center;
    gap : 5px;
    font-weight: 500;
`

const User = styled.div`
    display: flex;
    align-items: center;
    gap :10px;
    font-weight:500;
    color: ${({theme})=>theme.text};
    margin-right: 10px;
    position: absolute;
`

const LogOut = styled.button`
    position: absolute;
    top: 50px;
    font-weight: bold;
    font-size: 16px;
    right: 0px;
    height: fit-content;
    width: fit-content;
    padding:10px 10px;
    background-color: ${({theme})=>theme.soft};
    color: ${({theme})=>theme.text};
    border: 2px solid ${({theme})=>theme.textSoft};
`

const Avatar1 = styled.img`
  height: 32px;
  width: 32px;
  background-position: center;
  border-radius: 50%;
`

export default function Navbar() {

 const [open,setOpen] = useState(false);
 const [hovered,setIsHovered] = useState(false);
 const {user} = useSelector(state=>state.user);
 console.log("nav"+" "+JSON.stringify(user))
 const dispatch = useDispatch()
 const navigate = useNavigate();


 const handleLogOut =() =>{
    dispatch(logout());
    navigate("/signin");
 }

  return (
   <>
    <Container>
        <Wrapper>
            <Search>
                <Input placeholder='Search'/>
                <SearchOutlined/>
            </Search>
            {user ? <>
              <User>
                <VideoCallOutlined onClick={()=>setOpen(true)}/>
                <Avatar1 src={user?.img} onClick={()=>setIsHovered(!hovered)}/>
                {user.name}
                <LogOut onClick={handleLogOut} style={{opacity:hovered?'1':'0',transition:'opacity 0.5s ease'}}>Logout</LogOut>
              </User>
              {}
            </> : <>
            <Link to="/signin" style={{textDecoration:'none',backgroundColor:'inherit'}}>
            <Button>
        
            <AccountCircleOutlined/>
            SIGN IN
            </Button>
            </Link>
            
            </>
        }
        </Wrapper>
     </Container>
     {open && <Upload setOpen={setOpen}/>}
    </>
  )
}
