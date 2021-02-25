import logo from './logo.svg';
import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import StartPage from './components/StartPage';
import Example from './components/Example';
import TestPage from './components/TestPage';
import TestFinish from './components/TestFinish';
import TestResult from './components/TestResult';
import {UserContext , ExContext, AnswerContext} from './context/Context';

// todo
// 이름을 올바르게 입력하지 않았을 경우, 이에 대한 안내 메세지를 출력합니다. => onChange 혹은 onBlur 사용
// 성별을 선택하지 않았을 경우, 이에 대한 안내 메세지를 출력합니다.
// 검사 예시 페이지부터는 진행 표시줄(Progress bar)가 포함 되어야 있어야 하며, 검사 예시 페이지는 0%로 측정되어야 합니다.(진행 표시줄의 형태는 무관합니다.)
// event 관련 함수에서 useCallback 사용하기 -> 사용하지 않으면 변수가 변경되었을때 잘 적용되지 않을 수도 있다.

// useMemo -> useEffect랑 비슷한데 return값을 받아서 변수에 저장 가능!
function App() {
  const [user, setUser] = useState({name: '', gender:''});
  const userValue = {user, setUser};

  const [check, setCheck] = useState('');
  const exValue = {check, setCheck};

  const [answer, setAnswer] = useState([]);
  const answerValue = {answer, setAnswer};

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
          <AnswerContext.Provider value= {answerValue}>
            <div>
              <TestPage/>
            </div>
          </AnswerContext.Provider>
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
          <div>
            <TestResult/>
          </div>
      </Route>

    </Switch>
    </main>
  );
}


export default App;
