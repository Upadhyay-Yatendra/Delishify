import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const params = useParams();

  // Define a unique key for each cuisine type in local storage
  const localStorageKey = `cuisine_${params.type}`;

  useEffect(() => {
    // Check if data exists in local storage for the current cuisine type
    const cachedData = localStorage.getItem(localStorageKey);

    if (cachedData) {
      console.log("fetching data locally ");
      // Use the cached data if it exists
      setCuisine(JSON.parse(cachedData));
    } else {
      console.log("fetching data from api");
      // Fetch data from the API
      const fetchData = async () => {
        const apiKey = import.meta.env.VITE_APIKEY;
        const data = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${params.type}`
        );
        const recipes = await data.json();
        const newCuisine = recipes.results;

        // Store the fetched data in local storage
        localStorage.setItem(localStorageKey, JSON.stringify(newCuisine));

        // Update the state with the fetched data
        setCuisine(newCuisine);
      };

      // Call the fetchData function to make the API request
      fetchData();
    }
  }, [params.type, localStorageKey]);

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((item) => (
        <Card key={item.id}>
          <Link to={"/recipe/" + item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
}

// Rest of your styled components and export statement remain the same

const Grid = styled(motion.div)`
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    max-width: 100%;
    height: auto;
    ${'' /* border: solid black 2px; */}
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
    margin: 0;
    max-width: 15rem; /* Adjust the max-width as needed */
    word-wrap: break-word; /* Allows long words to break and wrap to the next line */
  }
`;
export default Cuisine;
