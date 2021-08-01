import React, { useState } from "react";
import { Container1,
        FormWrap,
        Icon,
        FormContent,
        FormH1,
        Form,
        Container,
        Row,
        Seat
} from './BookingElement'

const Booking = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    };



    return (
        <>
        <Container1>
                <FormWrap>
                    <Icon to="/">Study Joa</Icon>
                    <FormContent>
                        <Form action="#">
                            <FormH1>이용좌석을 선택하세요</FormH1>
                            <Container>
                            <Row>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">1</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">2</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">3</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">4</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">5</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">6</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">7</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">8</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">9</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">10</Seat>
                            </Row>
                            <Row>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">11</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">12</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">13</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">14</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">15</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">16</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">17</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">18</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">19</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">20</Seat>
                            </Row>
                            <Row>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">21</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">22</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">23</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">24</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">25</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">26</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">27</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">28</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">29</Seat>
                                <Seat  onMouseEnter={onHover} onMouseLeave={onHover} primary="true">30</Seat>
                            </Row>
                            </Container>
                        </Form>
                    </FormContent>
                </FormWrap>
        </Container1>
        </>
    )
}

export default Booking
