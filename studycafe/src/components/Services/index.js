import React from 'react'
import Icon1 from '../../images/svg-1.svg'
import Icon2 from '../../images/svg-2.svg'
import Icon3 from '../../images/svg-3.svg'
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
                    <ServicesH2>Reduce Expenses</ServicesH2>
                    <ServicesP>We help reduce your fees and increments</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon2}/>
                    <ServicesH2>Virtaul Offices</ServicesH2>
                    <ServicesP>We help reduce your fees and increments</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon3}/>
                    <ServicesH2>Premium Benefits</ServicesH2>
                    <ServicesP>We help reduce your fees and increments</ServicesP>
                </ServicesCard>
            </ServicesWrapper>
        </ServicesContainer>
    )
    }

export default Services
