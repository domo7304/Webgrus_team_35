import React from 'react'
import { 
    FooterContainer,
    FooterWrapper,
    FooterLinksWrapper,
    FooterLinksContainer,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink

 } from './FooterElement'
const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrapper>
            <FooterLinksContainer>
                <FooterLinksWrapper>
                    <FooterLinkItems>
                        <FooterLinkTitle>About us</FooterLinkTitle>
                            <FooterLink to="login">How it works</FooterLink>
                            <FooterLink to="login">Testimonials</FooterLink>
                            <FooterLink to="login">Careers</FooterLink>
                            <FooterLink to="login">Investors</FooterLink>
                            <FooterLink to="login">Teams of Service</FooterLink>
                    </FooterLinkItems>
               
                    <FooterLinkItems>
                        <FooterLinkTitle>About us</FooterLinkTitle>
                            <FooterLink to="login">How it works</FooterLink>
                            <FooterLink to="login">Testimonials</FooterLink>
                            <FooterLink to="login">Careers</FooterLink>
                            <FooterLink to="login">Investors</FooterLink>
                            <FooterLink to="login">Teams of Service</FooterLink>     
                    </FooterLinkItems>
                </FooterLinksWrapper>
                    <FooterLinksWrapper>
                    <FooterLinkItems>
                        <FooterLinkTitle>About us</FooterLinkTitle>
                            <FooterLink to="login">How it works</FooterLink>
                            <FooterLink to="login">Testimonials</FooterLink>
                            <FooterLink to="login">Careers</FooterLink>
                            <FooterLink to="login">Investors</FooterLink>
                            <FooterLink to="login">Teams of Service</FooterLink>                        
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLinkTitle>About us</FooterLinkTitle>
                            <FooterLink to="login">How it works</FooterLink>
                            <FooterLink to="login">Testimonials</FooterLink>
                            <FooterLink to="login">Careers</FooterLink>
                            <FooterLink to="login">Investors</FooterLink>
                            <FooterLink to="login">Teams of Service</FooterLink>
                    </FooterLinkItems>
                    </FooterLinksWrapper>
            </FooterLinksContainer>
            </FooterWrapper>
        </FooterContainer>
    )
}

export default Footer
