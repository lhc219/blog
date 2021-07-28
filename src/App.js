/* eslint-disable */

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  // 자주 바뀌는 중요한 변수는 state를 사용하자! state는 변경되면 html이 새로고침 없이 자동으로 재렌더링됨
  let [글제목, 글제목변경] = useState(['달콤이 소개', '새콤이 소개', '쪼꼼이 소개']);
  let [따봉, 따봉변경] = useState(0);
  // state값을 변경해주기 위해서는 ,변경 함수를 이용
  // 블로그 제목처럼 자주 바꾸지 않는 것들은 굳이 state로 하지 않아도 됨

  // state로 ui가 보임/안보임 스위치를 넣음 | 버튼에 넣을 때는 state앞에 !를 붙이면 true or false로 상태를 바꿀 수 있음
  let [modal, modal변경] = useState(false);
  let [누른제목, 누른제목변경] = useState(0);
  let [입력값, 입력값변경] = useState('');
  let subject = '곰곰동이의 블로그';

  function 제목바꾸기() {
    // JS에서는 값을 공유하므로, 아래 방법처럼 deep copy(...붙여서) 해서 가져와야함
    const newArray = [...글제목];
    newArray[0] = '똥콤이 소개';
    글제목변경(newArray);
  }

  function 제목추가하기() {
    let newArray = [...글제목];
    newArray[글제목.length] = 입력값;
    글제목변경(newArray);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>{subject}</div>
      </div>
      {/* <div className="list">
        <h3>{글제목[0]} <span onClick={() => { 따봉변경(따봉 + 1) }}>👍</span>{따봉}</h3>
        <p>7월 28일 발행</p>
        <hr />
      </div>
      <div className="list">
        <h3>{글제목[1]}</h3>
        <p>7월 28일 발행</p>
        <hr />
      </div>
      <div className="list">
        <h3>{글제목[2]}</h3>
        <p>7월 30일 발행</p>
        <hr />
      </div> */}

      {
        // jsx안에서는 함수를 쓸 수 없으므로, {}를 이용하여 함수 입력
        // for문을 사용할 수 없으므로 .map()을 이용
        // const array = [2,3,4];
        // const newArray = array.map(function(a){
        //     return a * 2
        //     console.log(newArray) // newArray = [4.6.8]
        // });

        // 글제목 array 갯수만큼 반복한다.
        // 글제목 array 안에 있는 것들이 '글번호'처럼 나옴
        // .map을 쓸 때는 key={}를 써줘야 warning이 안 뜸
        글제목.map(function (글, i) {
          return <div className="list" key={i}>
            <h3 onClick={() => { 누른제목변경(i) }}>{글} <span onClick={() => { 따봉변경(따봉 + 1) }}>👍</span>{따봉}</h3>
            <p>7월 28일 발행</p>
            <hr />
          </div>
        })
      }

      {/* onChange: input에 입력값이 입력될 때 마다 함수를 실행 */}
      {/* e.target.value: 현재 input에 입력된 값 */}
      {/* <input onChange={(e) => { 입력값변경(e.target.value) }} /> */}
      {/* 저장버튼 누르면 '입력값'에 입력하고, [.unshift array제일 앞에 추가] 글 추가 */}
      <div className="publish">
        <input onChange={(e) => { 입력값변경(e.target.value) }} />
        <button onClick={() => {
          let arrayCopy = [...글제목];
          arrayCopy.unshift(입력값);
          글제목변경(arrayCopy);
        }}>저장</button>
      </div>

      <button onClick={() => { modal변경(!modal) }}>모달 열고닫기</button>


      {
        // but, if문을 사용할 수 없으므로, 삼항연산자 라는 것을 이용
        // 1 < 3 ? console.log('맞아요') : console.log('틀려요')
        // 조건식 ? true일 때 실행할 코드 : false일 때 실행할 코드
        modal === true
          // 자식 component에 state넘겨주기. 넘겨줄state '작명={state}'
          // 자식 component에 props 넣어주기. 넘겨받을state앞에 .props 붙이기
          ? <Modal 글제목={글제목} 누른제목={누른제목}></Modal>
          : null
      }

    </div>
  );
}

// component만들기 아래처럼 만들고 난 후 html부분에 입력
// component이름 시작은 항상 대문자
// return()안에는 태그 하나로 묶어야 함 
// html을 축약해서 쓸 수 있으니 관리하기 편함!! [반복출현하는 html, 자주 바뀌는 html UI, 다른 페이지]
// state 쓸 때 복잡해짐
function Modal(props) {
  return (
    <div className="modal">
      <h2>{props.글제목[props.누른제목]}</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;
