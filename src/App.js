import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import StartPage from './components/StartPage';
import Example from './components/Example';
import TestPage from './components/TestPage';
import TestFinish from './components/TestFinish';
import TestResult from './components/TestResult';
import Intro from './components/Intro';
import {UserContext , ExContext, AnswersContext} from './context/Context';


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
