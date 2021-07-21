login

login/server/models/User.js -> backset\server\schemas\user.js (스키마 병합. 기존의 것에 추가)
스키마에서 loginCnt, lockYn 은 기존 테스트 프론트 부에 이용되었던 것이므로 추후 새 로그인 폼이 나옴에 따라
지워도 무방


login/server/index.js -> backset\server\routes\memberRouter.js
기존의 app.use 형태에서 라우터 형식으로 변환

config 제거

-----------------------------------
seatReserve

서버 부분 seatReserve/server/routes/Router -> backset/server/routes/bookingRouter
클라이언트 부분 client/src/index.js -> backset/client/public/src/BookingForm

booking, login, forum server port 8080으로 통합

bookingForm 내부 reserve = confirm("좌석을 예약하시겠습니까")
->  reserve = window.confirm("좌석을 예약하시겠습니까")
 
서버 구동 확인
렌더링 함수가 db에서 데이터를 받아서 포트 8080을 이용해야 하는데 db접근이 불가능해서 함수 실행이 안됨
 