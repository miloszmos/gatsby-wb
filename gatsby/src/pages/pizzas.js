import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';

const PizzasPage = ({ data }) => {
  console.log(data);
  return (
    <>
      <PizzaList pizzas={data.pizzas.nodes} />
    </>
  );
};

export default PizzasPage;

export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
