import React from 'react';
import {FaBars} from 'react-icons/fa' // error발생시 npm install react-icons --save
import { 
    Nav, 
    NavbarContainer, 
    NavLogo, 
    MobileIcon,  
    NavMenu, 
    NavItem, 
    NavLinks,
    NavBtn,
    NavBtnLink,
}  from './NavbarElement';

const Navbar = ({toggle}) => {
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to="/">Study Joa</NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars/>
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to="community">커뮤니티</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="intro">시설소개</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="reservation">시설예약</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="map">오시는길</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn> 
                        <NavBtnLink to="/login">로그인</NavBtnLink>
                    </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
    );
};

export default Navbar;