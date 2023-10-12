import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/css';
import { Link } from "react-router-dom";

function Popular() {

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {

    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    }
    else {

      const apiKey = import.meta.env.VITE_APIKEY;

      // console.log("aPIKEY :>", apiKey);
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9`)

      const data = await api.json();
      console.log(data);
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
      // console.log("popular:>", popular);

    }
  }


  const options = {
    perPage: 4,
    // arrows: false
    pagination: false,
    drag: "free",
    gap: '5rem'
  };
  // Add a media query to change the `perPage` option for smaller screens
  if (window.innerWidth <= 768) {
    options.perPage = 2; // Set perPage to 1 for screens with a width of 768px or less
  }
  if (window.innerWidth <= 1100 && window.innerWidth >= 768) {
    options.perPage = 3; // Set perPage to 1 for screens with a width of 768px or less
  }
  if (window.innerWidth <= 600) {
    options.perPage = 1; // Set perPage to 1 for screens with a width of 768px or less
  }

  return (
    <div>
      <Wrapper>

        <h3>Popular Picks</h3>
        <Splide options={options}>
          {popular.map(recipe => {
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
        </Splide>

      </Wrapper>
    </div>
  );

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
export default Popular