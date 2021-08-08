import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardDetail extends Component {
  state = {
    board: []
  };

  componentDidMount() {//리액트의 생명주기에서 렌더링이 완료되면 실행되는 함수. 밑에 작성한 getDetail함수로부터 this.props.location.query값인 _id를 받아오는데, 이를 이용해 로그인 되어있는지를 확인할 수 있다.
    if (this.props.location.query !== undefined) {//location.query는 getDetail함수에서 id로부터 상세한 정보를 가져오기 위해 이용되는 것
      this.getDetail();//로그인이 되어있다면 getDetail함수 호출
    } else {
      window.location.href = "/board";//로그인이 풀려있다면 메인페이지로 돌리기
    }
  }

  deleteBoard = _id => {//아래의 삭제문 코드에서 이어짐
    const send_param = {
      headers,
      _id
    };
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("http://localhost:8080/board/delete", send_param)//server board -> boardrouter -> delete
        //정상 수행
        .then(returnData => {
          alert("게시글이 삭제 되었습니다.");
          window.location.href = "/board";
        })
        //에러
        .catch(err => {
          console.log(err);
          alert("글 삭제 실패");
        });
    }
  };

  getDetail = () => {
    const send_param = {
      headers,
      _id: this.props.location.query._id
    };
    const marginBottom = {
      marginBottom: 5
    };
    axios
      .post("http://localhost:8080/board/detail", send_param)
      //getDetail함수로부터 서버측의 boardRouter에서 response를 성공적으로 받으면
      .then(returnData => {
        if (returnData.data.board[0]) {
          const board = ( //여기서부터는 프론트단. 테이블의 디자인은 자유
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{returnData.data.board[0].title}</th> {/*서버단의 board로부터 받은 json파일을 js문법으로 적용 */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: returnData.data.board[0].content
                      }}//html을 태그 사이에 그대로 적용하는 것은 허용이 안될 수도 있으므로 이와 같은 메소드 사용
                    ></td>
                  </tr>
                </tbody>
              </Table>
              <div>
                <NavLink
                  to={{
                    pathname: "/boardWrite",
                    query: {
                      title: returnData.data.board[0].title,
                      content: returnData.data.board[0].content,
                      _id: this.props.location.query._id
                    }//수정시 다시 전송해줄 데이터들이다. 
                  }}
                >
                  <Button block style={marginBottom}>
                    글 수정
                  </Button>
                </NavLink>
                <Button
                  block
                  onClick={this.deleteBoard.bind(//delete board라는 메소드 호출
                    null,
                    this.props.location.query._id
                  )}
                >
                  글 삭제
                </Button>
              </div>
            </div>
          );
          this.setState({
            board: board
          });
        } else {
          alert("글 상세 조회 실패");
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };

  //onClick={this.getBoard.bind(null,this.props._id)}
  render() {
    const divStyle = {
      margin: 50
    };
    return <div style={divStyle}>{this.state.board}</div>;
  }
}

export default BoardDetail;
