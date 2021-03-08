import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from '../context/Context';
import './StartPage.css';


function StartPage(){
    const {user, setUser} = useContext(UserContext);
    const [error, setError] = useState({name:'', gender:''});
  
    const handleValue = useCallback(e =>{
        setUser(state =>({...state, [e.target.name]: e.target.value}));
    },[user.name, user.gender])

    const useDidMountEffect = (func, deps)=>{
      const didMount = useRef(false);
      useEffect(()=>{
        if(didMount.current)func();
        else didMount.current = true;
      }, deps);
    }

    const handleValidation = useCallback(()=>{
      const nameReg = /^[가-힣]{2,4}$|^[a-zA-Z]{2,10}$/;
      if(!user.name){
        setError(state=>({...state, name:"이름을 입력해주세요."}));
      }else if(!nameReg.test(user.name)){
        setError(state=>({...state, name:"이름을 올바르게 입력해주세요."}));
      }
      else{
        setError(state=>({...state, name:""}));
      }
      if(!user.gender){
        setError(state=>({...state, gender:"성별을 선택해주세요."}));
      }else{
        setError(state=>({...state, gender:""}));
      }
    },[user]);

    useDidMountEffect(()=>{
      handleValidation();
    },[user])


    return(
      <>
      <h1>직업 가치관 검사</h1>
      <form>

        <div className={!error.name ? "input-group": "input-group error"}>
          <label>이름</label>
          <br/>
          <input type="text" name="name" onChange={handleValue} 
          value={user.name}></input>
          <div className="error-message">{error.name}</div>
        </div>
        <br/>
        <div className={!error.gender ? "input-group": "input-group error"}>
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
          <div className="error-message">{error.gender}</div>
        </div>
        <br/>
          <Link 
            to ={user.name === '' || user.gender ==='' ? '#' : '/example'}>
            <button 
              type="Submit" 
              className={user.name === '' || user.gender ==='' ? "start-button-disabled" : "start-button"}
              disabled={user.name === '' || user.gender ==='' ? true : false}>
              <span>
                검사 시작 
              </span>
            </button>
          </Link>
        </form>
      </>
    );
  }


  export default StartPage;