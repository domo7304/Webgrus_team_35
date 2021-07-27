import React from 'react'
import Icon1 from '../../images/jpg-1.jpg'
import Icon2 from '../../images/jpg-2.jpg'
import Icon3 from '../../images/jpg-3.jpg'
import Icon4 from '../../images/jpg-4.jpg'
import { 
    ServicesContainer,
    ServicesIcon,
    ServicesH1,
    ServicesWrapper,
    ServicesCard,
    ServicesH2,
    ServicesP    
} from './ServicesElement'


const Services = () => {
    return (
        <ServicesContainer id='intro'>
            <ServicesH1>시설 소개</ServicesH1>
            <ServicesWrapper>
                <ServicesCard>
                    <ServicesIcon src={Icon1}/>
                    <ServicesH2>스터디룸</ServicesH2>
                    <ServicesP>소음걱정 없이 소통하며 공부할 수 있는 공간</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon2}/>
                    <ServicesH2>깔끔한 디자인</ServicesH2>
                    <ServicesP>밝은 조명이 갖추어진 스터디 공간</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon3}/>
                    <ServicesH2>넓은 좌석</ServicesH2>
                    <ServicesP>공간을 넓고 쾌적하게 사용 가능합니다.</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon4}/>
                    <ServicesH2>프리미엄 컨퍼런스룸</ServicesH2>
                    <ServicesP>다용도로 사용할 수 있는 초고급 회의실</ServicesP>
                </ServicesCard>
            </ServicesWrapper>
        </ServicesContainer>
    )
    }

export default Services
