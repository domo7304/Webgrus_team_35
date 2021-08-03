// 웹사이트 디자인을 관리하는 스크립트 (스크롤했을시 보여지는 다른페이지들)

export const homeObjZero = {
    id: "community",
    lightBg: true, //불빛이 들어오게 해주는 역할
    lightText: false,
    lightTextDesc: false,
    topLine: "커뮤니티",
    headLine: "스터디카페 회원들을 위한 소통공간",
    description: "다양한 공부 정보를 서로 교류 해보세요!",
    buttonLabel: "바로가기",
    imgStart: false,
    img: require("../../images/svg-5.svg").default,
    alt: "Car",
    dark: false,
    primary: false,
    darkText: true,
    linkR: "/board"
};

// 시설소개
export const homeObjOne = {
    id: "intro",
    lightBg: false, //불빛이 들어오게 해주는 역할
    lightText: true,
    lightTextDesc: true,
    topLine: "시설 소개",
    headLine: "스터디카페 회원들의 소통공간",
    description: "다양한 공부 정보를 서로 교류 해보세요!",
    buttonLabel: "Get started",
    imgStart: true,
    img: require("../../images/svg-1.svg").default,
    alt: "Car",
    dark: true,
    primary: true,
    darkText: false,
};

//시설예약
export const homeObjTwo = {
    id: "reservation",
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: "시설 예약",
    headLine: "쉽고 간단한 무인 결제 시스템",
    description: "저렴한 가격에 정액권과 시간권이 준비되어 있습니다.",
    buttonLabel: "바로가기",
    imgStart: false,
    img: require("../../images/jpg-5.jpg").default,
    alt: "Car",
    dark: false,
    primary: false,
    darkText: true,
    linkR: "/book"
};

//오시는길
export const homeObjThree = {
    id: "map",
    lightBg: false, //불빛이 들어오게 해주는 역할
    lightText: true,
    lightTextDesc: true,
    topLine: "오시는 길",
    headLine: "대중교통을 통해 쉽게 오갈수 있는 공간",
    description: "지하철역과 5분거리에 위치하여 누구나 쉽게 찾아올 수 있습니다.",
    buttonLabel: "지도보기",
    imgStart: true,
    img: require("../../images/svg-3.svg").default,
    alt: "Car",
    dark: true,
    primary: true,
    darkText: false,
};

// 회원가입
export const homeObjFour = {
    id: "signup",
    lightBg: true, //불빛이 들어오게 해주는 역할
    lightText: false,
    lightTextDesc: false,
    topLine: "회원가입",
    headLine: "Unlimited Transactions with zero fees",
    description: "Get access to a ",
    buttonLabel: "Start Now",
    imgStart: false,
    img: require("../../images/svg-4.svg").default,
    alt: "Car",
    dark: false,
    primary: false,
    darkText: true,
    linkR: "/signup"
};
