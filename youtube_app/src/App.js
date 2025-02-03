import styled, { ThemeProvider } from "styled-components";
import Menu from "../src/components/Menu"
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";

const Container = styled.div`
   display : flex;
   
`
// just a layout Container. like home container in social media project
const HomeContainer = styled.div`
   background-color: ${({theme}) => theme.bg};
   flex : 7;
`

const Wrapper = styled.div`
  padding: 24px 98px;
`

function App() {

  const [lightMode,setLightMode] = useState(true);

  return (
    <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
    <Container>
      <BrowserRouter>
      <Menu lightMode={lightMode} setLightMode={setLightMode}/>
      <HomeContainer>
        <Navbar/>
        <Wrapper>
          
          <Routes>
            <Route path="/">
              <Route index element={<Home/>}/>
              <Route path="/video">
                 <Route path=":id" element={<Video/>}/>
              </Route>
              <Route path="/signin" element={<SignIn/>}/>
            </Route>
          </Routes>

          
        </Wrapper>
      </HomeContainer>
      </BrowserRouter>
    </Container>
  </ThemeProvider>
  );
}

export default App;
