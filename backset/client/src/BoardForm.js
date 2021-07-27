import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardRow extends Component {//boardform안에 boardrow 있음
  render() {
    return (
      <tr>
        <td>
          <NavLink
            to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
          >{/* 글 타이틀을 클릭하면 위 url로 이동 */}
            {this.props.title}
          </NavLink>
        </td>
        <td>
          <NavLink
            to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
          >
            {this.props.createdAt.substring(0, 10)}{/* 작성 일자를 클릭하면 위 url로 이동 */}
          </NavLink>
        </td>
        <td>
          <NavLink
            to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
            >{(this.props.content).replace(/(<([^>]+)>)/ig,"")}
         {/*본문을 불러올 시 p태그가 노출되어 자바스크립트 정규표현식을 이용해 p태그 제거함 */}
          </NavLink>
        </td>
      </tr>
    );
  }
}

class BoardForm extends Component {
  state = {
    boardList: []
  };

  componentDidMount() {
    this.getBoardList();
  }

  getBoardList = () => {
    const send_param = {
      headers,
      _id: $.cookie("login_id")
    };
    axios
      .post("http://localhost:8080/board/getBoardList", send_param)
      .then(returnData => {
        let boardList;
        if (returnData.data.list.length > 0) {
          console.log(returnData.data.list.length);
          const boards = returnData.data.list;
          boardList = boards.map(item => (//반복문을 통해 아래의 세트로 묶어줄 것
            <BoardRow
              key={Date.now() + Math.random() * 500}
              _id={item._id}
              createdAt={item.createdAt}
              title={item.title}
              content = {item.content}
            ></BoardRow>
          ));
          // console.log(boardList);
          this.setState({
            boardList: boardList//빈 배열에 바로 위 코드에서 작성한 map을 넣어준다.
          });
        } else {
          boardList = (
            <tr>
              <td colSpan="3">게시글이 존재하지 않습니다.</td>
            </tr>
           
          );
          this.setState({
            boardList: boardList
          });
          // window.location.reload();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const divStyle = {
      margin: 50
    };

    return (
      <div>
        <div style={divStyle}>
          <Table table table-hover>
            <thead class = "thead-light" >
              <tr>
                <th width = "325">닉네임</th>
                <th width = "200">날짜</th>
                <th>글 내용</th>
              </tr>        
            </thead>
            <tbody>{this.state.boardList}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default BoardForm;
