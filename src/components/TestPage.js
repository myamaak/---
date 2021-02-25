import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import API_KEY from '../config';
import {AnswerContext, UserContext} from '../context/Context';
import { useHistory, Link } from "react-router-dom";

function TestPage(){
    const {user, setUser} = useContext(UserContext);
    const {answer, setAnswer} = useContext(AnswerContext);

    const [items, setItems] = useState([]);
    const [page, setPage] = useState();
    const [thisP, setThis] = useState('');
    const post_api_url = `http://www.career.go.kr/inspct/openapi/test/report`;
    const history = useHistory();

    useEffect(()=>{
        async function getItems(){
            const response = await axios.get(`https://www.career.go.kr/inspct/openapi/test/questions?apikey=${API_KEY}&q=6`);
            const tests = response.data.RESULT;
            setItems(tests);
            if (answer.length != response.data.RESULT.length){
                setAnswer(new Array(response.data.RESULT.length));
            }
            setPage(0);
        }
        getItems();
    }, []);

    useEffect(()=>{
        getPage();
    }, [page, answer]);

    function getPage(){
        const cur = items.slice(page*5, page*5+5);
        const qPage = cur.map(
            (item)=>(
                <div key ={item.qitemNo}>
                    <p>{item.qitemNo} {item.question}</p>
                    <div class='radio'>
                        <label>
                            <input 
                                type='radio' 
                                name={"B"+item.qitemNo} 
                                onChange={handleCheck(item.qitemNo)} 
                                value={item.answerScore01} 
                                checked = {answer[item.qitemNo-1] === item.answerScore01 } />
                            {item.answer01}
                        </label>
                        <label>
                            <input 
                                type='radio' 
                                name={"B"+item.qitemNo} 
                                onChange={handleCheck(item.qitemNo)} 
                                value={item.answerScore02} 
                                checked = {answer[item.qitemNo-1] === item.answerScore02 }/>
                            {item.answer02}
                        </label>
                    </div>
                </div>
            )
        );
        setThis(
        <>
        {qPage}
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
        setPage(page+1);
        // if(page<5){
        //     setPage(page+1);
        // }else{
        //     history.push('/finish');
        //     //검사완료
        //     //이때 검사결과 post요청 보내기
            
        // }
    }

    const postResult = useCallback(
        async (formatAnswers) =>{
            var date = new Date();
            var timestamp = date.getTime();

            const request = { 
                "apikey": API_KEY,
                "qestrnSeq": "6",
                "trgetSe": "100209",
                "name": user.name,
                "gender": user.gender,
                "startDtm": timestamp.toString(),
                "answers": formatAnswers
            }

            console.log(request);
            const response = await axios.post(
                post_api_url, 
                request, 
                {headers: {'Content-Type': 'application/json'}
            });

            const resultCode = response.data.RESULT.url.split("=")[1];
            console.log(resultCode);
            history.push('/finish/'+resultCode);
            // if(response.data.SUCC_YN ==="Y"){
            //     const resultCode = response.data.RESULT.url.split("=")[1];
            //     console.log(resultCode);
            //     history.push('/finish/'+resultCode);
            // }else{
            //     //에러 페이지 보여주기
            // }
            
        }, [post_api_url]);

    const handleSubmit = e =>{
        e.preventDefault();
        console.log(answer);

        var formatAnswers = "";

        for(var i =0 ; i<answer.length; i++){
            var formatEach = "B"+(i+1).toString()+"="+answer[i].toString()+" ";
            formatAnswers+=formatEach;
        }
        console.log(formatAnswers);

        postResult(formatAnswers);
    }

    const handleCheck = questionsNum => e =>{
        setAnswer(state =>{
            const newAnswers = [...state];
            newAnswers[questionsNum-1] = e.target.value;
            return newAnswers;
        });  
    }

    var size = answer.filter(function(value) { return value !== undefined }).length;

    console.log(size);
    const nextB = (<input type = "button" value = "다음 >" onClick={handleRight} disabled={size >= 5*(page+1)? false: true}/> );
    const submB = (<input type = "button" value = "제출 >" onClick={handleSubmit} disabled={size === items.length? false: true}/>);

    return(
        <form class="container" >
            <h2>검사 진행 {Math.ceil(size/answer.length*100)}%</h2>
            <progress value={size} max="28"></progress>
            {thisP}
            <div>
                <input type = "button" value = "< 이전" onClick={handleLeft}/>
                {page===5? submB : nextB}
            </div>
        </form>
    );
}

export default TestPage;