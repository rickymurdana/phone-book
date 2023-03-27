/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
// import ContactList from './ContactList';
import { ContactContext } from '../context/ContactContext';
import { GET_CONTACT_LIST } from '../graphql/queries';

describe('ContactList component', () => {
  it('should render loading state', () => {
    const mocks = [
      {
        request: {
          query: GET_CONTACT_LIST,
        },
        result: {
          data: {
            contact: [],
          },
          loading: true,
        },
      },
    ];

    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        {/* <ContactContext.Provider value={{ contact: [], setContact: jest.fn() }}> */}
          {/* <ContactList /> */}
        {/* </ContactContext.Provider> */}
      </MockedProvider>
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render contact', async () => {
    const mocks = [
      {
        request: {
          query: GET_CONTACT_LIST,
        },
        result: {
          data: {
            todos: [
              {
                id: 1,
                firstName: "Jono",
                lastName: "Oni",
                phone: {
                    number: "1234"
                }
              },
              {
                id: 2,
                firstName: "roma",
                lastName: "pone",
                phone: {
                    number: "001"
                }
              },
            ],
          },
        },
      },
    ];

    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        {/* <ContactContext.Provider value={{ contact: [], setContact: jest.fn() }}> */}
          {/* <ContactList /> */}
        {/* </ContactContext.Provider> */}
      </MockedProvider>
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(getByText(/Jono Oni 1234/i)).toBeInTheDocument();
    expect(getByText(/roma pone 001/i)).toBeInTheDocument();
  });
});
