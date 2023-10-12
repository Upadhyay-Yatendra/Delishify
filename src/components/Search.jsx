import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };
  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </FormStyle>
  );
}
const FormStyle = styled.form`
  margin: 0 auto; /* Center the form horizontally */
  width: 50%; /* Set a maximum width for the form */

  div {
    position: relative;
}

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem; /* Adjust padding */
    border-radius: 1rem;
    outline: none;
    width: 100%;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 1rem; /* Adjust the left position */
    transform: translateY(-50%);
    color: white;
    margin-right: 1rem;

  }

  @media (max-width: 768px) {
    width: 100%;
    /* Responsive styles for screens less than or equal to 768px wide */
    input {
      padding: 1rem 2rem; /* Adjust padding for smaller screens */
    }

    svg {
      left: 0.5rem; /* Adjust the left position for smaller screens */
      margin-right:1rem;
    }
  }
`;

export default Search;
