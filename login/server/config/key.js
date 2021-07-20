// development 상태에 있을 경우에는 환경변수 process.env.NODE_ENV 가 development
// prodection 상태에 있을 경우에는 development가 나오므로
// 추후 배포를 생각하여 이에 따라 분기
if (process.env.NODE_ENV === 'production'){
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}