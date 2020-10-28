import React from 'react';
import { ItemsGrid, ItemStyled } from '../styles/Grids';

const LoadingGrid = ({ count }) => (
  <ItemsGrid>
    {Array.from({ length: count }, (_, i) => (
      <ItemStyled>
        <p>
          <span className="mark">Loading...</span>
        </p>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAQAAADIpIVQAAAAEElEQVR42mNkqGcAA0YiGAA+twKBIQLdEwAAAABJRU5ErkJggg=="
          className="loading"
          alt="Loading"
          width="500"
          height="500"
        />
      </ItemStyled>
    ))}
  </ItemsGrid>
);

export default LoadingGrid;
