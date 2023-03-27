import React from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ContactProvider from './context/ContactContext';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { Routes, Route, Outlet, Link } from "react-router-dom";

const baseStyles = css`
  font-size: 16px;
  padding: 16px;
`;

const headerStyles = css`
  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const Container = styled.div`
  ${baseStyles}
`;

const Header = styled.h1`
  ${baseStyles}
  ${headerStyles}
`;

const App: React.FC = () => {
  return (
    <ContactProvider>
      <Routes>
        <Route path='/' element={<ContactList />} />
        <Route path='/form' element={<ContactForm />} />
        <Route path='/form/:id' element={<ContactForm />} />
      </Routes>
    </ContactProvider>
  );
};

export default App;
