import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from '../context/Context';


function StartPage(){
    const {user, setUser} = useContext(UserContext);
    const [error, setError] = useState({name:'', gender:''});
  
    //아래와 같은 eventhandler에서 useCallback 사용하기
    const handleValue = e =>{
        setUser(state =>({...state, [e.target.name]: e.target.value}));
    }

    // const handleValidation = () => {
    //     if(!prof.name){
    //         setError(state=>({...state, name:"이름을 입력해주세요."}));
    //     }else{
    //         setError(state=>({...state, name:""}));
    //     }
    // }
  
    console.log(user);
  
    return(
      <>
      <h1>직업 가치관 검사</h1>
      <form>
        <label>이름</label>
        <br/>
        <input className={!user.name ? "invalid-input": "input"} type="text" name="name" onChange={handleValue} 
         value={user.name}></input>
        <span style={{color: "red"}}>{error.name}</span>
        <br/>
        <br/>
        <label>성별</label>
        <br/>
        <div className="gender">
          <label>
            <input type="radio" value="100323" name="gender" onChange={handleValue} checked={user.gender ==="100323"}/>남성
          </label>
          <label>
            <input type="radio" value="100324" name="gender" onChange={handleValue} checked={user.gender === "100324"}/>여성
          </label>
        </div>
        <span style={{color: "red"}}>{error.gender}</span>
        <br/>
        <Link to ='/example'><input type="submit" value="검사 시작" disabled={user.name === '' || user.gender ==='' ? true : false}></input></Link>
      </form>
      </>
    );
  }


  export default StartPage;