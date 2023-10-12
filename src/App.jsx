
import Pages from './Pages/Pages'
import { useState } from 'react'
import './App.css'
import Category from './components/Category'
import Search from './components/Search'
import { BrowserRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GiKnifeFork } from 'react-icons/gi'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Nav>
            <GiKnifeFork />
            <Logo to={'/'}>deliciousss</Logo>
          </Nav>
          <Search />
          <Category />
          <Pages />
        </BrowserRouter>
      </div>
    </>
  )
}
const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem; /* Adjust the font size as desired */
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
  margin-right: 1rem; /* Add margin for spacing */
`;

const Nav = styled.div`
  padding: 2rem 1rem; /* Adjust the padding as needed */
  display: flex;
  align-items: center; /* Vertically center the content */
   /* Align content to the left and right */

  svg {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    /* Responsive styles for screens less than or equal to 768px wide */
    padding: 1rem 1rem; /* Adjust padding for smaller screens */
   
    align-items: flex-start; /* Align content to the left on smaller screens */

    ${Logo} {
      font-size: 1rem; /* Adjust font size for the logo on smaller screens */
      margin-right: 0; /* Remove right margin for spacing on smaller screens */
    }
  }
`;

export default App
