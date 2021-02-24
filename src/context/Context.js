import React from 'react';

export const UserContext = React.createContext({
  user: {name: '', gender:''},
  setUser: ()=>{}
  });

export const ExContext = React.createContext({
  check : '',
  setCheck : () => {}
})

export const AnswerContext = React.createContext({
  answer : [],
  setAnswer : () => {}
})

