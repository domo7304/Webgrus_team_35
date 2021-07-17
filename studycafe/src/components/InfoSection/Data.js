// 웹사이트 디자인을 관리하는 스크립트 (스크롤했을시 보여지는 다른페이지들)

export const homeObjZero = {
    id: "community",
    lightBg: true, //불빛이 들어오게 해주는 역할
    lightText: false,
    lightTextDesc: false,
    topLine: "커뮤니티",
    headLine: "Unlimited Transactions with zero fees",
    description: "Get access to a ",
    buttonLabel: "바로가기",
    imgStart: false,
    img: require("../../images/svg-5.svg").default,
    alt: "Car",
    dark: false,
    primary: false,
    darkText: true,
};

// 시설소개
export const homeObjOne = {
    id: "intro",
    lightBg: false, //불빛이 들어오게 해주는 역할
    lightText: true,
    lightTextDesc: true,
    topLine: "시설 소개",
    headLine: "Unlimited Transactions with zero fees",
    description: "Get access to a ",
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
    headLine: "Unlimited Transactions with zero fees",
    description: "Get access to a ",
    buttonLabel: "바로가기",
    imgStart: false,
    img: require("../../images/svg-2.svg").default,
    alt: "Car",
    dark: false,
    primary: false,
    darkText: true,
};

//오시는길
export const homeObjThree = {
    id: "map",
    lightBg: false, //불빛이 들어오게 해주는 역할
    lightText: true,
    lightTextDesc: true,
    topLine: "오시는 길",
    headLine: "Unlimited Transactions with zero fees",
    description: "Get access to a ",
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
};
