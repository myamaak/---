import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import axios from 'axios';
import API_KEY from '../config';
import {AnswersContext, UserContext} from '../context/Context';
import { useHistory, Link } from "react-router-dom";
import './TestPage.css';

function TestPage(){
    const {user, setUser} = useContext(UserContext);
    const {answers, setAnswers} = useContext(AnswersContext);//답 여러개니까 answers로 바꿔주는게 좋음

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
            if (answers.length != response.data.RESULT.length){
                setAnswers(new Array(response.data.RESULT.length));
            }
            setPage(0);
        }
        getItems();
    }, []);

    useEffect(()=>{
        getPage();
    }, [page, answers]);

    // https://stackoverflow.com/questions/2011142/how-to-change-the-style-of-the-title-attribute-inside-an-anchor-tag
    //title attribute design
    function getPage(){
        const cur = items.slice(page*5, page*5+5);
        const qPage = cur.map(
            (item)=>(
                <div key ={item.qitemNo} className="item-box">
                    <p>{item.qitemNo}. {item.question}</p>
                    <div className='radio'>
                        <label title={item.answer03}>
                            <input 
                                type='radio' 
                                name={"B"+item.qitemNo} 
                                onChange={handleCheck(item.qitemNo)} 
                                value={item.answerScore01} 
                                checked = {answers[item.qitemNo-1] === item.answerScore01 } />
                            {item.answer01}
                        </label>
                        <label title={item.answer04}>
                            <input 
                                type='radio' 
                                name={"B"+item.qitemNo} 
                                onChange={handleCheck(item.qitemNo)} 
                                value={item.answerScore02} 
                                checked = {answers[item.qitemNo-1] === item.answerScore02 }/>
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
        e.preventDefault();
        if(page>0){
            setPage(page-1);
        }else{
            history.push('/example');
        }
    }

    const handleRight = e =>{
        e.preventDefault();
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
        console.log(answers);

        var formatAnswers = "";

        for(var i =0 ; i<answers.length; i++){
            var formatEach = "B"+(i+1).toString()+"="+answers[i].toString()+" ";
            formatAnswers+=formatEach;
        }
        console.log(formatAnswers);

        postResult(formatAnswers);
    }

    const handleCheck = questionsNum => e =>{
        setAnswers(state =>{
            const newAnswers = [...state];
            newAnswers[questionsNum-1] = e.target.value;
            return newAnswers;
        });  

    }


    const size = useMemo(()=>{
        return answers.filter(function(value) { return value !== undefined }).length;
    },[answers]) 

    console.log(page);

    const nextB = (<button 
                        className = {size >= 5*(page+1)? "button-right":"button-disabled"}
                        onClick={handleRight} 
                        disabled={size >= 5*(page+1)? false: true}>
                        <span>다음</span>
                    </button> );

    const submB = (<button
                        className = {size === items.length? "button-right":"button-disabled"}
                        onClick={handleSubmit} 
                        disabled={size === items.length? false: true}>
                         <span>제출</span>   
                        </button>);

    const handlePageChange = (e) =>{
        e.preventDefault();
        setPage(Number(e.target.id));
    }

    let allPages = [0]
    for(var i =1 ; i<=Math.floor(size/5);i++){
        if(i != Math.ceil(answers.length/5)+1){
            allPages.push(i);
        }
    }

    //이부분 나중에 css로 빼기..
    
    const pagination = allPages.map(
        (eachPage)=>(
            <a href="#" 
                // id={eachPage}
                onClick={handlePageChange} 
                key={eachPage}
                className={page == eachPage? "clicked-style" : "link-style"}>
                <span id={eachPage} className={page == eachPage? "clicked-dot" : "link-dot"}></span>
            {/* {eachPage} */}
            </a>));

    return(
        <form className="container" >
            <h2>검사 진행 {size? Math.ceil(size/answers.length*100): 0}%</h2>
            <progress value={size} max={answers.length}></progress>
            {thisP}
            <div className ="pagination">
                <button onClick={handleLeft} className="button-left">
                <span>이전</span>
                </button>

                {pagination}

                {page + 1 === Math.ceil(answers.length/5)? submB : nextB}
            </div>
        </form>
    );
}

export default TestPage;