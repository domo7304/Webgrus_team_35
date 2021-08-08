import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Container1 = styled.div`
    min-height: 692px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
    background: linear-gradient(
        108deg,
        rgba(1, 147, 86, 1) 0%,
        rgba(10, 201, 122, 1) 100%
    );
`;

export const FormWrap = styled.div`
    height: 100%;
    display: flex;
    
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 400px) {
        height: 80%;
    }
`;

export const Icon = styled(Link) `
    margin-left: 32px;
    margin-top: 32px;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    font-size: 32px;

    @media screen and (max-width: 480px) {
        margin-left: 16px;
        margin-top: 8px;
    }
`;

  export const FormContent = styled.div`
    height: 100%;
    display: flex;
    
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 700px) {
        width: 80%;
        justify-content: center;
    }
`;



export const Form = styled.form`
    background: #010101;
    max-width: 700px;
    height: auto;
    width: 100%;
    z-index: 1;
    display: grid;
    margin: 0 auto;
    padding: 80px 32px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

    @media screen adn (max-width: 400px) {
        padding: 32px 32px;
    }
`

export const FormH1 = styled.h1`
    margin-bottom : 40px;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
`;

export const Body = styled.div `
    background-color: #242333;
    display: flex;
    flex-direction: column;
    color: white;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: 'Lato', 'sans-serif';
  }
  `

  export const seatConatainer = styled.select `
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 10px;
  padding: 5px 15px 5px 15px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  `
  
  export const Container = styled.div `
    perspective: 1000px;
    margin-bottom: 30px;
`

export const Seat = styled.div `
background: ${({primary}) => (primary? '#fff' : '#01BF71')};
height: 24px;
width: 30px;
margin: 6px;
text-align:center;
text-color : #010101;
border-top-left-radius: 10px;
border-top-right-radius: 10px;

&:hover{
    transition: all 0.2s ease-in-out;
    background: ${({primary})=> (primary?  '#01BF71' : '#fff' )};

}
`

export const Screen = styled.div`
background-color: #fff;
height: 70px;
width: 100%;
margin: 15px 0;
transform: rotateX(-45deg);
box-shadow: 0 3px 10px rgba(255, 255, 255, 0.75);
`

export const Row = styled.div`
  display:flex;
  justify-content:center;
`