
import { BrowserRouter, NavLink, Route, Routes } from 'react-router';
//import './index.css'
import { Container, Navbar } from 'react-bootstrap'
import Home from './home'
import Game from './game'


function App() {

  return (
    <BrowserRouter>
      <Bar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game/:game/:difficulty/:colours' element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

function Bar() {

  return (

    <Navbar className='bg-primary-subtle navbar-expand shadow d-flex'>
      <Container  className='d-flex align-items-center '>
        
          <NavLink to="/" className="navbar-brand ">
            <img src="/house-fill.svg" alt=""
              width="50"
              height="40" />
          </NavLink>
      
        <Container className='flex-grow-1 justify-content-center d-flex' >
          <Navbar.Brand className='fs-2'>
            Tom's Mind Games
          </Navbar.Brand>
           
        </Container>
      </Container>
    </Navbar>
  );
}
