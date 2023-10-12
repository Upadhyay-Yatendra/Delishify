import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {Link} from 'react-router-dom'
function Searched() {
  const [searchedRecipe, setSearchedRecipe] = useState([]);
  let params = useParams();

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  const getSearched = async (name) => {
    try {
      const apiKey = import.meta.env.VITE_APIKEY;
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${name}&number=12`
      );
      const recipes = await data.json();
      setSearchedRecipe(recipes.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Grid>
      {searchedRecipe.map((item) => (
        <Card key={item.id}>
        <Link to={'/recipe/'+item.id}>
          <img src={item.image} alt={item.title} />
          <h4>{item.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
}

// Define your styled components (Grid, Card) here if needed


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 1rem;
  @media(max-width:1024px){
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }
  @media(max-width:774px){
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  }
`;

const Card = styled.div`
  max-width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
    margin: 0;
  }
`;

export default Searched;
