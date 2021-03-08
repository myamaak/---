import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API_KEY from '../config';
import { Link } from 'react-router-dom';
import {ExContext} from '../context/Context';
import './TestPage.css';

function Example(){
    const [item, setItem] = useState({question:'', answer:[], score:[]});
    const {check, setCheck} = useContext(ExContext);

    useEffect(()=>{
        async function getEx(){
            const response = await axios.get(`https://www.career.go.kr/inspct/openapi/test/questions?apikey=${API_KEY}&q=6`);
            const ex = response.data.RESULT[0];
            setItem({question: ex.question, answer:[ex.answer01, ex.answer02], score: [ex.answerScore01, ex.answerScore02]});
        }
        getEx();
    }, []);

    
    const handleCheck = e =>{
        setCheck(e.target.value);
    }

    return(
        <div className="container">
            <h2>검사 예시</h2>
            <h3>0%</h3>
            <progress value="0" max="100"></progress>
            <div className="item-box">
                <p>{item.question}</p>
                <div className='radio'>
                    <label>
                        <input type='radio' name='answer' onChange={handleCheck} value={item.score[0]} checked={check === item.score[0]}/>{item.answer[0]}
                    </label>
                    <label>
                        <input type='radio' name='answer' onChange={handleCheck} value={item.score[1]} checked={check === item.score[1]}/>{item.answer[1]}
                    </label>
                </div>
            </div>
            <Link to = '/intro'>
                <button type="button" className="button-left" style={{width: "90px"}} type="button">
                    <span>이전</span>
                </button>
            </Link>
            <Link to = '/test'>
                <button className={check ? "start-button": "start-button-disabled"} style={{width: "90px"}}type="button" disabled={check ? false: true}>
                    <span>검사 시작</span>
                </button>
            </Link>
        </div>
    );
}

export default Example;