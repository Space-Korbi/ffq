import React from 'react';
import styled from 'styled-components';

import logo from '../../logo.svg';

const Wrapper = styled.a.attrs({
  className: 'navbar-brand'
})``;

// * Stateless component
const Logo = () => {
  return (
    <Wrapper href="https://nytimes.com">
      <img src={logo} width="50" height="50" alt="tagesschau.de" />
    </Wrapper>
  );
};

export default Logo;
