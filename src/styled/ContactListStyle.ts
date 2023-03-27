import styled from '@emotion/styled';

export const List = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: #333;
    color: #fff;

    h1 {
      margin: 0;
    }
  }

  main {
    flex: 1;
    padding: 1rem;
    overflow-y: scroll;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        border-bottom: 1px solid #ddd;
        cursor: pointer;

        &:hover {
          background-color: #eee;
        }

        .name {
          width: 30%;
        }

        .phone-number {
          width: 30%;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }

  footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
  }

  @media (max-width: 560px) {
    header {
      padding: 5px;
    }

    h1 {
      font-size: 20px;
    }

    main {
      padding: 5px;

      ul {
        li {
          padding: 5px;
        }
      }
    }

    h2 {
      font-size: 18px;
    }

    p {
      font-size: 12px;
    }
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;

  input {
    border: none;
    flex: 1;
    padding: 0.5rem;
    border-radius: 5px;
    font-size: 1rem;
  }

  @media (max-width: 560px) {
    padding: 2px;

    input {
      padding: 5px;
      font-size: 0.5rem;
    }
  }
`;

export const AddSearch = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 560px) {
    font-size: 10px;
  }
`;

export const Actions = styled.div`
  display: flex; 
  gap: 1.5rem;
  align-items: center;
`;

