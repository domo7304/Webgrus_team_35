import React, {useState, useEffect} from 'react';
import {FaBars} from 'react-icons/fa' // error발생시 npm install react-icons --save
import {IconContext} from 'react-icons/lib';
import {animateScroll as scroll} from 'react-scroll';
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
    const [scrolNav, setScrolNav] = useState(false);

    const changeNav = ()=> {
        if(window.scrollY >= 80) {
            setScrolNav(true)
        } else {
            setScrolNav(false)
        }
    }

    useEffect(() => {
      window.addEventListener('scroll', changeNav);
    }, []);

    const toggleHome =() => {
        scroll.scrollToTop();
    }

    return (
        <>
        <IconContext.Provider value = {{color : '#fff'}}>
            <Nav scrolNav={scrolNav}>
                <NavbarContainer>
                    <NavLogo to="/" onClick={toggleHome}>Study Joa</NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars/>
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to="community"
                            smooth={true} duration={500} spy={true}
                            exact='true' activeClass="active" offset={-80}
                            >커뮤니티</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="intro" 
                            smooth={true} duration={500} spy={true}
                            exact='true' activeClass="active" offset={-80}
                            >시설소개</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="reservation" 
                            smooth={true} duration={500} spy={true}
                            exact='true' activeClass="active" offset={-80}
                            >시설예약</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="map" 
                            smooth={true} duration={500} spy={true}
                            exact='true' activeClass="active" offset={-80}
                            >오시는길</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn> 
                        <NavBtnLink to="/login">로그인</NavBtnLink>
                    </NavBtn>
                </NavbarContainer>
            </Nav>
            </IconContext.Provider>
        </>
    );
};

export default Navbar;