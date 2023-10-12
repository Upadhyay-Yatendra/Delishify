import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/css';
import { Link } from "react-router-dom";

function Veggie() {


  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {

    const check = localStorage.getItem("veggie");
    // console.log("\n\n\ncheck:->",check)

    if (check && check.length != 0) {
      setVeggie(JSON.parse(check));
      console.log("from localstorage")
    }
    else {
      console.log('from API');
      const apiKey = import.meta.env.VITE_APIKEY;

      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9&tags=vegetarian`);

      if (!api.ok) {
        // Handle API request error here, e.g., by displaying an error message.
        throw new Error(`API request failed with status: ${api.status}`);
      }

      const data = await api.json();
      // console.log("data->",data);
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
      // console.log("veggie:>", veggie);

    }

    // console.log("Veggies:->", veggie)
  }

  const options = {
    perPage: 3,
    // arrows: false
    pagination: false,
    drag: "free",
    gap: '5rem'
  };
  // Add a media query to change the `perPage` option for smaller screens
  if (window.innerWidth <= 768) {
    options.perPage = 1; // Set perPage to 1 for screens with a width of 768px or less
  }
  if (window.innerWidth <= 1100 && window.innerWidth >= 768) {
    options.perPage = 2; // Set perPage to 1 for screens with a width of 768px or less
  }
  return (
    <div>
      <Wrapper>

        <h3>Our Vegeterian Picks</h3>
        {veggie.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <Splide options={options}>
            {veggie.map(recipe => {
              return (
                <SplideSlide key={recipe.id}>
                  <Card >
                    <Link to={'/recipe/' + recipe.id}>
                      <p>{recipe.title}</p>
                      <img src={recipe.image} alt={recipe.title} />
                      <Gradient />
                    </Link>
                  </Card>
                </SplideSlide>
              )
            })}
          </Splide>)}

      </Wrapper>
    </div>
  )
}



const Wrapper = styled.div`
  margin:4rem 0rem;

`

const Card = styled.div`
  min-height:25rem;
  border-radius:2rem;
  overflow : hidden;
  position:relative;
  
  img{
    border-radius : 2rem;
    position:absolute;
    left:0;
    width:100%;
    height:100%;
    object-fit:cover;
  }
  p{
    position:absolute;
    z-index:10;
    left:50%;
    bottom:0%;
    transform : translate(-50%,0%);
    color:white;
    width:100%;
    text-align:center;
    font-weight:600;
    font-size:1rem;
    display:flex;
    justify-content:center;
    align-items:center;
}
`
const Gradient = styled.div`
  z-index:3;
  position:absolute;
  width:100%;
  height:100%;
  background : linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));
`

export default Veggie