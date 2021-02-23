import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function StartPage(){
    const [prof, setProf] = useState({name: '', gender:''});
    const history = useHistory();
    const [error, setError] = useState('');
  
    const handleValue = e =>{
      setProf(state =>({...state, [e.target.name]: e.target.value}))
    }
  
    console.log(prof);
  
    const handleSubmit = e =>{
        e.preventDefault();
        history.push('/example');
        // https://stackoverflow.com/questions/34735580/how-to-do-a-redirect-to-another-route-with-react-router 참고
    }
  
    return(
      <>
      <h1>직업 가치관 검사</h1>
      <form onSubmit={handleSubmit}>
        <label>이름</label>
        <br/>
        <input type="text" name="name" onChange={handleValue} value={prof.name}></input>
        <br/>
        <br/>
        <label>성별</label>
        <br/>
        <div className="gender">
          <input type="radio" value="남성" name="gender" onChange={handleValue} checked={prof.gender ==="남성"}/>남성
          <input type="radio" value="여성" name="gender" onChange={handleValue} checked={prof.gender === "여성"}/>여성
        </div>
        <br/>
        <input type="submit" value="검사 시작" disabled={prof.name === '' || prof.gender ==='' ? true : false}></input>
      </form>
      </>
    );
  }

  //다음 페이지에 다녀온 후에도 입력 정보 유지하기 위해서는 어떻게 하지?
  
  export default StartPage;