import React, {useState} from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection'
import InfoSection from '../components/InfoSection';
import { homeObjZero, homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from '../components/InfoSection/Data';

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
            <Sidebar/>
            <Navbar/>
            <HeroSection/>
            <InfoSection {...homeObjZero}/>
            <InfoSection {...homeObjOne}/>
            
            <InfoSection {...homeObjTwo}/>
            <InfoSection {...homeObjThree}/>
            <InfoSection {...homeObjFour}/>
        </>
    );
};

export default Home
