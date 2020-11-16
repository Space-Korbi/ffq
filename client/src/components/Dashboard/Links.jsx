import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

const List = styled.div.attrs({
  className: 'navbar-nav mr-auto'
})``;

const Item = styled.div.attrs({
  className: 'collpase navbar-collapse'
})``;

/**
 * * Stateless component
 * Whenever you don't need state of lifecycle methods,
 * you should write your component as a stateless function.
 * Stateless components are in general easier to reason about.
 */
const Links = () => {
  const match = useRouteMatch();
  return (
    <div>
      <List>
        <Item>
          <Link to={`${match.url}/movies/list`} className="nav-link">
            List Movies
          </Link>
        </Item>
        <Item>
          <Link to={`${match.url}/movies/create`} className="nav-link">
            Create Movie
          </Link>
        </Item>
      </List>
    </div>
  );
};

export default Links;
