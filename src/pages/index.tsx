import styled from 'styled-components';
import React from 'react';
import { NextPage } from 'next';

const Nav = styled.nav`
  max-width: 56em;
  margin: 0 auto;
  padding: 0.4em;
`;

const Ul = styled.ul`
  display: flex;
  padding: 0;
`;

const Li = styled.li`
  display: block;
  padding: 0.4em;
  color: red;
`;

export const MainPage: NextPage = () => (
  <Nav>
    <Ul>
      <Li>1dasdsa</Li>
      <Li>1dasdsa</Li>
      <Li>1dasdsa</Li>
      <Li>1dasdsa</Li>
      <Li>1dasdsa</Li>
      <Li>1dasdsa</Li>
      <Li>1dasdsa</Li>
      <Li>1dasdsa</Li>
      <Li>1dasdsa</Li>
      <Li>1dasdsa</Li>
    </Ul>
  </Nav>
);

export default MainPage;
