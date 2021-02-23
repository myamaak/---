import logo from './logo.svg';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import StartPage from './StartPage';
import Example from './Example';
// ### 1. 유저 설정

// - 이름을 입력할 수 있는 폼을 구현합니다.
// - 성별을 선택할 수 있는 폼을 구현합니다.
// - 이름 혹은 성별을 기입하지 않거나 선택하지 않을 경우 검사 시작 버튼이 비활성화 되어야 합니다.

// ### 2. 검사 예시 페이지

// - 검사를 시작하기 전 앞으로의 진행 방식에 대해서 설명하는 페이지를 구현합니다.
// - 진행 방식에 대한 검사 예제 문항이 한 문항을 화면에 표시합니다.
// - 검사 시작 버튼을 구현합니다.


function App() {
  return (
    <main>
    <Switch>
       <Route path='/' component={StartPage} exact/>
       <Route path='/example' component={Example}/>
    </Switch>
    </main>
  );
}


export default App;
