import React from 'react';
import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrap,
    SidebarRoute,
} from './SidebarElement';

const Sidebar = ({isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}> 
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to="community" onClick={toggle}>
                    커뮤니티
                    </SidebarLink>
                    <SidebarLink to="intro" onClick={toggle}>
                    시설소개
                    </SidebarLink>
                    <SidebarLink to="reservation" onClick={toggle}>
                    시설예약
                    </SidebarLink>
                    <SidebarLink to="map" onClick={toggle}>
                    오시는길
                    </SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to="/login" onClick={toggle}>로그인</SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar