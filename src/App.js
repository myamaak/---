import logo from './logo.svg';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import StartPage from './components/StartPage';
import Example from './components/Example';
import TestPage from './components/TestPage';
import TestFinish from './components/TestFinish';
import TestResult from './components/TestResult';
import {UserContext , ExContext, AnswersContext} from './context/Context';

// todo
// 이름을 올바르게 입력하지 않았을 경우, 이에 대한 안내 메세지를 출력합니다. => onChange 혹은 onBlur 사용
// 성별을 선택하지 않았을 경우, 이에 대한 안내 메세지를 출력합니다.

//참고사항
// event 관련 함수에서 useCallback 사용하기 -> 사용하지 않으면 변수가 변경되었을때 잘 적용되지 않을 수도 있다.
// useMemo -> useEffect랑 비슷한데 return값을 받아서 변수에 저장 가능!
//reactstrap
//rechart


//구현 추천
//다음버튼 disabled일때 누르면 alert 띄워주기...(왜 넘어갈 수 없는지)
//이전 버튼은 너무 많이 눌러야 될 수 있으니까 맨 밑에 누르면 해당 페이지로 이동 가능한 버튼 숫자로 만들기!(페이징, pagenation)
//검사결과 sns 공유기능
//추천 직종 시각화해서 보여주기 하고싶어 d3나 그..그거 써보기 이고잉님이 좋아하시는거
//.env로 apikey같은거 관리해보기

//꿀팁
//단어 선택하고 ctrl+d 한채로 단어를 수정하면 그 단어와 같은 단어들을 전부 수정가능! -> 변수명 바꿀때 쓰기~ 

//무언가 임포트 필요한걸  썼을때 편하게 임포트 하려면 단어 위에 커서 올리고 ctrl + space 하면 선택지가 주어지는데 고르고 엔터 누르면 
//직접 타이핑 할 필요 없이 자동으로 import가 된다
function App() {
  const [user, setUser] = useState({name: '', gender:''});
  const userValue = {user, setUser};

  const [check, setCheck] = useState('');
  const exValue = {check, setCheck};

  const [answers, setAnswers] = useState([]);
  const answersValue = {answers, setAnswers};

  return (
    <main>
    <Switch>
      <Route path='/' exact>
        <UserContext.Provider value={userValue}>
          <div>
            <StartPage/>
          </div>
        </UserContext.Provider>
      </Route>

      <Route path='/example' >
        <ExContext.Provider value={exValue}>
          <div>
            <Example/>
          </div>
        </ExContext.Provider>
      </Route>

      <Route path='/test'>
        <UserContext.Provider value={userValue}>
          <AnswersContext.Provider value= {answersValue}>
            <div>
              <TestPage/>
            </div>
          </AnswersContext.Provider>
          </UserContext.Provider>
      </Route>

      <Route path='/finish/:seq'>
          <TestFinish/>
      </Route>
{/* 
      <Route path='/result/:seq'>
      <UserContext.Provider value={userValue}>
        <AnswerContext.Provider value= {answerValue}>
          <div>
            <TestResult/>
          </div>
        </AnswerContext.Provider>
      </UserContext.Provider>
      </Route> */}

      <Route path='/result/:seq'>
        <UserContext.Provider value={userValue}>
          <AnswersContext.Provider value= {answersValue}>
          <div>
            <TestResult/>
          </div>
          </AnswersContext.Provider>
        </UserContext.Provider>
      </Route>

    </Switch>
    </main>
  );
}


export default App;
