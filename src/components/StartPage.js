import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from '../context/Context';

function StartPage(){
    const {user, setUser} = useContext(UserContext);
    const [error, setError] = useState({name:'', gender:''});
  
    //아래와 같은 eventhandler에서 useCallback 사용하기
    const handleValue = useCallback(e =>{
        setUser(state =>({...state, [e.target.name]: e.target.value}));
        // handleValidation();
        //이 안에서 handleValidation 함수를 호출하면 한박자 늦게 기능하는데, 이게 정확히 왜 그런건지 궁금.
    },[user.name, user.gender])

    const useDidMountEffect = (func, deps)=>{
      const didMount = useRef(false);
      useEffect(()=>{
        if(didMount.current)func();
        else didMount.current = true;
      }, deps);
    }

    //맨 처음 아무 입력도 없었을때는 에러를 띄우지 않는 방법 
    //=> user 값이 바뀌었을 때만이 아니라 initial render 에서도 useEffect가 실행되는데 이걸 막고싶음.
    //커스텀 훅으로 update일때만 실행되도록 했는데...이게 그다지 효율적이지 않을 것 같아서 걱정.
    const handleValidation = useCallback(()=>{
      if(!user.name){
        setError(state=>({...state, name:"이름을 입력해주세요."}));
      }else{
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