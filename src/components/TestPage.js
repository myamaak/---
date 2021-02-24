import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API_KEY from '../config';
import {AnswerContext, UserContext} from '../context/Context';
import { useHistory, Link } from "react-router-dom";

function TestPage(){
    const {answer, setAnswer} = useContext(AnswerContext);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState();
    const [thisP, setThis] = useState('');
    const [count, setCount] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        async function getItems(){
            const response = await axios.get(`https://www.career.go.kr/inspct/openapi/test/questions?apikey=${API_KEY}&q=6`);
            const tests = response.data.RESULT;
            setItems(tests);
            setPage(0);
        }
        getItems();
    }, []);

    useEffect(()=>{
        getPage();
    }, [page, answer]);

    function getPage(){
        const cur = items.slice(page*5, page*5+5)
        const qPage = cur.map(
            (item)=>(
                <div key ={item.qitemNo}>
                    <p>{item.qitemNo} {item.question}</p>
                    <div class='radio'>
                        <input type='radio' name={"B"+item.qitemNo} onChange={handleCheck} value={item.answerScore01} checked = {answer["B"+item.qitemNo] === item.answerScore01 } />{item.answer01}
                        <input type='radio' name={"B"+item.qitemNo} onChange={handleCheck} value={item.answerScore02} checked = {answer["B"+item.qitemNo] === item.answerScore02 }/>{item.answer02}
                    </div>
                </div>
            )
        );
        setThis(
        <>
        {qPage}
        {/* {button} */}
        </>);
    }

    const handleLeft = e =>{
        if(page>0){
            setPage(page-1);
        }else{
            history.push('/example');
        }
    }

    const handleRight = e =>{
        if(page<5){
            setPage(page+1);
        }else{
            history.push('/finish');
            //검사완료
        }
    }
    var visited = count;
    const handleCheck = e =>{

        setAnswer(state =>({...state,
            [e.target.name] : e.target.value
        }));
        if (!visited.includes(e.target.name)){
            visited.push(e.target.name);
        }
        setCount(visited);   
    }

    console.log(count);
    const nextB = (<input type = "button" value = "다음 >" onClick={handleRight} disabled={count.length >= 5*(page+1)? false: true}/> );
    const submB = (<input type = "button" value = "제출 >" onClick={handleRight} disabled={count.length === items.length? false: true}/>);

    return(
        <div class="container">
            <progress value={count.length.toString()} max="28">{count.length.toString()}</progress>
            {thisP}
            <div>
            <input type = "button" value = "< 이전" onClick={handleLeft}/>
            {page===5? submB : nextB}
        </div>
        </div>
    );
}

export default TestPage;