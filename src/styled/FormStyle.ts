import styled from '@emotion/styled';

export const Form = styled.div`
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

        form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          
            div {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
          
              label {
                font-weight: bold;
              }
          
              input {
                border: none;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 1rem;
              }

              .warning {
                width: fit-content;
                padding: 5px;
                border-radius: 5px;
                background-color: rgb(224, 9, 9, 0.4);
                font-size: 10px;
              }

              .required {
                color: red;
              }

              .number-label {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                
                .icon {
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                }
              }
            }
          
            button {
              border: none;
              padding: 0.5rem;
              border-radius: 4px;
              background-color: #333;
              color: #fff;
              cursor: pointer;
              font-size: 1rem;
          
              &:hover {
                background-color: #222;
              }

            }

            button:disabled,
            button[disabled]{
              background-color: #cccccc;
              color: #666666;
            }
        } 
    }

    @media (max-width: 560px) {
      header {
        padding: 5px;
      }
  
      h1 {
        font-size: 20px;
      }
    }
`;  