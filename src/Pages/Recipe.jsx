import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
  const [details, setDetails] = useState([]);
  const params = useParams();
  const recipeId = params.name;
  const [activeTab, setActiveTab] = useState("instructions");
  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  const fetchDetails = async () => {
    const apiKey = import.meta.env.VITE_APIKEY;
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    );
    const detailData = await data.json();
    setDetails(detailData);
    console.log("details->", details);
  };
  return (
    <DetailWrapper>
      <div className="TopSection">
        <div className="TopLeft">
          <Title>{details.title}</Title>
          <img src={details.image} alt={details.title} />
        </div>
      </div>
      {/* !!!!!!!!!!!!!!!!!!!!!!!!!!! */}

      <div className="buttons">
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
      </div>

      {/* !!!!!!!!!!!!!!!!!!!!!!!!!!! */}

      {activeTab === "instructions" && (
        <div>
          <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
          <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
        </div>
      )}

      {activeTab === "ingredients" && (
        <ul>
          {details.extendedIngredients.map((ingredient) => {
            return <li key={ingredient.id}>{ingredient.original}</li>;
          })}
        </ul>
      )}
    </DetailWrapper>
  );
}

const Title = styled.h2`
${'' /* max-width:50%; */}
  font-size: 2.5rem;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #ff5733, #ffc300);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: fadeIn 3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DetailWrapper = styled.div`
  max-width: 100%;
  margin-top: 4rem;
  margin-bottom: 2rem;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  .TopSection {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .TopLeft {
      margin-bottom: 2rem;
    }
  }

  .active:hover {
    background-color: #313131;
    transform: scale(1.05);
  }


  img {
    max-width: 100%;
    height: auto;
    border: 2px solid black;
    border-radius: 1rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2rem;
    margin: 0.5rem 0;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  font-weight: 600;

  @media (max-width: 462px) {
    padding: 1rem;
  }
`;

export default Recipe;
