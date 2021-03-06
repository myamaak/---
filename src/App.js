import logo from './logo.svg';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import StartPage from './components/StartPage';
import Example from './components/Example';
import TestPage from './components/TestPage';
import TestFinish from './components/TestFinish';
import TestResult from './components/TestResult';
import RecruitInfo from './components/RecuitInfo';
import Intro from './components/Intro';
import {UserContext , ExContext, AnswersContext} from './context/Context';

//antdesign 부트스트렙같은거! 근데 리액트에 더 최적화 되어있다
//fluentui
//styled component 많이 쓰인다!!!

//참고사항
// event 관련 함수에서 useCallback 사용하기 -> 사용하지 않으면 변수가 변경되었을때 잘 적용되지 않을 수도 있다.
// useMemo -> useEffect랑 비슷한데 return값을 받아서 변수에 저장 가능!
//reactstrap
//rechart


//구현 추천
//다음버튼 disabled일때 누르면 alert 띄워주기...(왜 넘어갈 수 없는지)
//.env로 apikey같은거 관리해보기

//종사자 평균 학력별/전공별 직업 정보를 시각화해서 더 보기 좋게 표시하기 
// 문항별 선택지 위에 커서를 올렸을 때 선택지에 대한 설명을 띄워 주기
// 검사 결과 공유 기능
// 커리어넷에서 제공하는 다른 검사들에 대한 소개 페이지
// 코드 완성도 높이기


//꿀팁
//단어 선택하고 ctrl+d 한채로 단어를 수정하면 그 단어와 같은 단어들을 전부 수정가능! -> 변수명 바꿀때 쓰기~ 

//무언가 임포트 필요한걸  썼을때 편하게 임포트 하려면 단어 위에 커서 올리고 ctrl + space 하면 선택지가 주어지는데 고르고 엔터 누르면 
//직접 타이핑 할 필요 없이 자동으로 import가 된다
//react hook form으로 form의 정보를 효율적으로 받아올 수 있다. -> setState로 값이 변경될때마다 컴포넌트를 새로 그리는 것을 막을 수 있다!!!
//optional chaining!


//https://oapi.saramin.co.kr/
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
          <div>
            <Intro/>
          </div>
      </Route>
      
      <Route path='/intro' exact>
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

      <Route path='/recruit/:seq/:job'>
          <div>
            <RecruitInfo/>
          </div>
      </Route>

    </Switch>
    </main>
  );
}


export default App;
