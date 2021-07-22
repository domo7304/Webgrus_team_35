import styled from 'styled-components'
import {Link as LinkR } from 'react-router-dom' // 일반 링크 (다른페이지)
import {Link as LinkS } from 'react-scroll' // 반응스크롤 npm install react-scroll

export const Nav = styled.nav`
    background: ${({scrolNav}) => (scrolNav ? '#01010b' : '#01010b')};
    height: 80px;
    //margin-top: -80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
    
    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`;

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;

`;

export const NavLogo = styled(LinkR)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    font-szie: 1.5rem;
    display: flex;
    align-items: center;
    align-left : 24px;
    font-weight: bold;
    text-decoration: none;
`;


export const MobileIcon = styled.div`
    display:none; /* 평소에 표시되지않음 */

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        curosr: pointer;
        color: #fff;
    }
`
 
export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: -22px;
    
    @media screen and (max-width: 768px) {
        display:none;
    }
`
export const NavItem=styled.li`
    height: 80px;
`

// 반응 스크롤 : s연결하면 맨위로이동
export const NavLinks = styled(LinkS)`
    color:#fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor:pointer;
    
    &.active {
        border-bottom: 3px solid #01bf71;
    }
`

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavBtnLink = styled(LinkR)`
    border-radius: 50px;
    background: #01bf71;
    white-space: nowrap;
    padding: 10px 22px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: 010606;
    }
` 