import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyled = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

const SlicemasterPage = ({ data: { slicemasters } }) => (
  <>
    <p>{process.env.GATSBY_PAGE_SIZE}</p>
    <SlicemasterGrid>
      {slicemasters.nodes.map((slicemaster) => (
        <SlicemasterStyled>
          <Link to={`/slicemaster/${slicemaster.slug.current}`}>
            {slicemaster.name}
          </Link>
          <Img fluid={slicemaster.image.asset.fluid} />
          <p className="description">{slicemaster.description}</p>
        </SlicemasterStyled>
      ))}
    </SlicemasterGrid>
  </>
);

export const query = graphql`
  query {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default SlicemasterPage;
