import React from 'react'
import {ButtonS, ButtonR} from '../ButtonElement';

import {InfoContainer,
    InfoWrapper,
    InfoRow, 
    Column1,
    Column2,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    BtnWrap,
    ImgWrap,
    Img

} from './InfoElement';

const InfoSection = ({
    lightBg,
    id,
    imgStart,
    topLine,
    lightText,
    headLine,
    darkText,
    description,
    buttonLabel,
    img,
    alt,
    primary,
    dark,
    dark2,
    linkR
}) => {
    return (
        <>
        <InfoContainer lightBg={lightBg} id={id}>
          <InfoWrapper>
            <InfoRow imgStart={imgStart}>
              <Column1>
                <TextWrapper>
                    <TopLine>{topLine}</TopLine>
                    <Heading lightText={lightText}>{headLine}</Heading>
                    <Subtitle darkText = {darkText}>{description}</Subtitle>
                    <BtnWrap>
                        <ButtonR to={linkR}
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact="true"
                        
                        primary={primary ? 1 : 0}
                        dark={dark ? 1 : 0}
                        dark2={dark2 ? 1 : 0}
                        >{buttonLabel}</ButtonR>
                    </BtnWrap>
                </TextWrapper>
              </Column1>
              <Column2>
                <ImgWrap>
                    <Img src={img} alt={alt}/>
                </ImgWrap>
              </Column2>
            </InfoRow>    
          </InfoWrapper>  
        </InfoContainer>
        </>
    )
}

export default InfoSection
