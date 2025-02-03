import React from 'react';
import styled from 'styled-components';
import LamaTube from '../img/logo.png';
import { AccountCircleOutlined, ExploreOutlined, FlagOutlined, HelpOutlineOutlined, HistoryOutlined, Home, LibraryMusicOutlined, LightModeTwoTone, LiveTvOutlined, MovieOutlined, NewspaperOutlined, SettingsOutlined, SportsBasketballOutlined, SportsEsportsOutlined, SubscriptionsOutlined, VideoLibraryOutlined } from '@mui/icons-material';
import './scrollbar.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Container = styled.div`
  flex: 1;
  background-color: ${({theme}) => theme.bgLighter};
  color: ${({theme}) => theme.text};
  height: 100vh;
  font-size: 15px;
  position: sticky;
  top: 0px;
  overflow-y: scroll;
`


const Wrapper = styled.div` 
  padding: 18px 26px;

`
const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    margin-bottom: 25px;
`

const Img = styled.img`
    height: 20px;
    
`
const Hr =  styled.hr`
    margin: 20px 0px;
    border : 0.5px solid ${({theme})=>theme.soft};
`

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 7.5px 0px;
    &:hover{
     background-color: ${({theme})=>theme.soft};
    }
`

const SignIn = styled.div`
    display: flex;
    flex-direction: column;
`

const SignInText = styled.span`
    color: ${({theme}) => theme.text};
    font-size: 15px;
    margin-bottom: 10px;
`

const SignInButton = styled.button`
    width: fit-content;
    padding: 10px 10px;
    border-radius: 3px;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    background-color: transparent;
    text-transform: uppercase;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
`

const Title = styled.h2`
    font-size: 14px;
    font-weight: 500;
    color : #aaaaaa;
    margin-bottom: 20px;
`



export default function Menu({lightMode,setLightMode}) {
  const {user} = useSelector(state=>state.user);
  return (
    <>
    <Container>
      <Wrapper>
       <Link to="/" style={{textDecoration:'none',color:'inherit'}}>
          <Logo>
          <Img src={LamaTube}/>
          KartTube
          </Logo>
       </Link>
       <Item>
            <Home/>
            home
       </Item>
       <Item>
            <ExploreOutlined/>
            Explore
       </Item>
       <Item>
            <SubscriptionsOutlined/>
            Subscriptions 
       </Item>
       <Hr/>
       <Item>
            <VideoLibraryOutlined/>
            Library 
       </Item>
       <Item>
            <HistoryOutlined/>
            History 
       </Item>
       <Hr/>
       {!user && <> <Link to="/signin" style={{textDecoration:'none',backgroundColor:'inherit'}}>

       <SignIn>
         <SignInText>Sign in to like videos comment and subscribe</SignInText>
        <SignInButton>
            <AccountCircleOutlined/>
            Sign In
        </SignInButton>
       </SignIn>
       </Link>
       <Hr/>
       </>}
       <Title>BEST OF KARTUBE</Title>
       <Item>
            <LibraryMusicOutlined/>
            Music 
       </Item>
       <Item>
          <SportsBasketballOutlined />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlined />
          Gaming
        </Item>
        <Item>
          <MovieOutlined />
          Movies
        </Item>
       <Item>
            <NewspaperOutlined/>
            News 
       </Item>
       <Item>
            <LiveTvOutlined/>
            Live 
       </Item>
       <Hr/>
       <Item>
            <SettingsOutlined/>
            Settings 
       </Item>
       <Item>
            <FlagOutlined/>
            Report 
       </Item>
       <Item>
            <HelpOutlineOutlined/>
            Help
       </Item>
       <Item onClick={()=>setLightMode(!lightMode)}>
            <LightModeTwoTone/>
            Lightmode
       </Item>
      </Wrapper>
    </Container>
    </>
  )
}
