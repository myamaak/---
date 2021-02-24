import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API_KEY from '../config';
import { Link } from 'react-router-dom';
import {ExContext} from '../context/Context';

//컴포넌트 분리하고 싶은데 hook 관리가 너무 어려움...

function Example(){
    const [item, setItem] = useState({question:'', answer:[], score:[]});
    const {check, setCheck} = useContext(ExContext);

    useEffect(()=>{
        async function getEx(){
            const response = await axios.get(`https://www.career.go.kr/inspct/openapi/test/questions?apikey=${API_KEY}&q=6`);
            // console.log(response.data.RESULT[0]);
            const ex = response.data.RESULT[0];
            console.log("example", ex);
            setItem({question: ex.question, answer:[ex.answer01, ex.answer02], score: [ex.answerScore01, ex.answerScore02]});
        }
        getEx();
    }, []);

    
    const handleCheck = e =>{
        setCheck(e.target.value);
    }

    console.log(check);
    // const optionList = item.answer.map(
    //     (each)=>(
    //         <div>
    //             <input type='radio' name='option' key={each.id}/>
    //             {each}
    //         </div>
    //     ));
    //option이 여러개일 경우를 대비해서 이런 식으로 코드를 짜고 싶은데 item.answer이 undefined로 나타남

    return(
        <div class="container">
            <h2>검사 예시</h2>
            <p>{item.question}</p>
            <div class='radio'>
                <input type='radio' name='answer' onChange={handleCheck} value={item.score[0]} checked={check === item.score[0]}/>{item.answer[0]}
                <input type='radio' name='answer' onChange={handleCheck} value={item.score[1]} checked={check === item.score[1]}/>{item.answer[1]}
            </div>
            <Link to = '/'><input type="button" value="이전" ></input></Link>
            <Link to = '/test'><input type="button" value="검사 시작" disabled={check ? false: true}></input></Link>
        </div>
    );
}

export default Example;