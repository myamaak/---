import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './context/Context';


function StartPage(){
    // const [prof, setProf] = useState({name: '', gender:''});
    const {prof, setProf} = useContext(UserContext);
    const [error, setError] = useState({name:'', gender:''});
  
    //아래와 같은 eventhandler에서 useCallback 사용하기
    const handleValue = e =>{
        setProf(state =>({...state, [e.target.name]: e.target.value}));
    }
    debugger;
    console.log(prof, setProf);
    // const handleValidation = () => {
    //     if(!prof.name){
    //         setError(state=>({...state, name:"이름을 입력해주세요."}));
    //     }else{
    //         setError(state=>({...state, name:""}));
    //     }
    // }
  
    return(
      <>
      <h1>직업 가치관 검사</h1>
      <form>
        <label>이름</label>
        <br/>
        <input class={!prof.name ? "invalid-input": "input"} type="text" name="name" onChange={handleValue} 
         value={prof.name}></input>
        <span style={{color: "red"}}>{error.name}</span>
        <br/>
        <br/>
        <label>성별</label>
        <br/>
        <div class="gender">
          <input type="radio" value="100323" name="gender" onChange={handleValue} checked={prof.gender ==="100323"}/>남성
          <input type="radio" value="100324" name="gender" onChange={handleValue} checked={prof.gender === "100324"}/>여성
        </div>
        <span style={{color: "red"}}>{error.gender}</span>
        <br/>
        <Link to ='/example'><input type="submit" value="검사 시작" disabled={prof.name === '' || prof.gender ==='' ? true : false}></input></Link>
      </form>
      </>
    );
  }

  //다음 페이지에 다녀온 후에도 입력 정보 유지하기 위해서는 어떻게 하지?
  //redux, useContext 사용

  export default StartPage;