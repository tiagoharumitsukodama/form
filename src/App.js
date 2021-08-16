import { useState } from "react";
import styled from "styled-components";

import Home from "./pages/Home";
import Form from './pages/Form'
import Login from './pages/Login'
import Alert from 'react-bootstrap/Alert'


function App() {

  const [currentPage, setCurrentPage] = useState('form')
  const [errMessage, setErrMessage] = useState('')

  const showCurrentPage = () => {
    switch (currentPage) {
      case 'form':
        return <Form setErrMessage={setErrMessage}/>
      case 'home':
        return <Home />
      case 'login':
        return <Login />
      default:
        return <Form />
    }
  }

  return (
    <StyledAppContainer>
      {showCurrentPage()}
      {errMessage && <Alert variant='danger' className='w-75 mt-5 mb-5'>{errMessage}</Alert>}
    </StyledAppContainer>
  );
}

const StyledAppContainer = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  width: 100vw;
  min-width: 375px;
  min-height: 100vh;
  padding-top: 5vh;

  background: #0F88F9;

  `

export default App;
