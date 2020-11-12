import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <div>
      <List>
        <Item>
          <Link to="/introduction" className="nav-link">
            Introduction
          </Link>
        </Item>
        <Item>
          <Link to="/movies/list" className="nav-link">
            List Movies
          </Link>
        </Item>
        <Item>
          <Link to="/movies/create" className="nav-link">
            Create Movie
          </Link>
        </Item>
      </List>
    </div>
  );
};

export default Links;
