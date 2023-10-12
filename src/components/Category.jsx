import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
  return (
    <List>
      <Slink to={"/cuisine/Italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </Slink>
      <Slink to={"/cuisine/American"}>
        <FaHamburger />
        <h4>American</h4>
      </Slink>
      <Slink to={"/cuisine/Thai"}>
        <GiNoodles />
        <h4>Thai</h4>
      </Slink>
      <Slink to={"/cuisine/Japanese"}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </Slink>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Slink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 1rem; /* Adjust the margin for spacing */
  text-decoration: none;
  background: linear-gradient(135deg, #f27121, #e94057);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);
  transition: transform 0.3s ease;

  h4 {
    color: #313131;
    font-weight: 600;
  }

  svg {
    color: white;
    font-size: 2rem;
  }

  &:hover {
    transform: scale(1.05);
  }

  &.active {
    transform: scale(1.05);
    background: linear-gradient(
      135deg,
      #e94057,
      #f27121
    ); /* Different color for active */
    svg {
      color: white;
    }
    h4 {
      color: white;
    }
  }

  @media (max-width: 768px) {
    /* Responsive styles for screens less than or equal to 768px wide */
    margin: 0.5rem; /* Adjust the margin for smaller screens */
    width: 5rem; /* Adjust the width for smaller screens */
    height: 5rem; /* Adjust the height for smaller screens */
    h4 {
      font-size: 0.8rem; /* Adjust the font size for smaller screens */
    }
    svg {
      font-size: 1.5rem; /* Adjust the font size for smaller screens */
    }
  }
  @media (max-width: 480px) {
    h4 {
      font-size: 0.5rem;
    }
    svg {
      font-size: 1rem;
    }
  }
`;

export default Category;
