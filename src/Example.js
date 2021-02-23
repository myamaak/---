import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import API_KEY from './config';

// function ExForm(props){

//     return(
//         <>
//         <p>{props.question}</p>
//         <div class='radiobutton'>
//             <input type='radio' name='answer' value={props.answer[0]}/>{props.answer[0]}
//             <input type='radio' name='answer' value={props.answer[1]}/>{props.answer[1]}
//         </div>
//         </>
//     );

// }
//컴포넌트 분리하고 싶은데 hoot 관리가 너무 어려움...

function Example(){
    const [item, setItem] = useState({question:'', answer:[]});
    const [check, setCheck] = useState();
    const history = useHistory();
    useEffect(()=>{
        async function getEx(){
            const response = await axios.get(`https://www.career.go.kr/inspct/openapi/test/questions?apikey=${API_KEY}&q=6`);
            // console.log(response.data.RESULT[0]);
            const ex = response.data.RESULT[0];
            console.log(ex);
            setItem({question: ex.question, answer:[ex.answer01, ex.answer02]});
        }
        getEx();
    }, []);

    console.log(item.answer);

    const handlePrev = e =>{
        e.preventDefault();
        history.push('/');
    }

    const handleNext = e =>{
        e.preventDefault();
        history.push('/');
        //추후 다음 페이지로 수정
    }
    
    const handleCheck = e =>{
        setCheck(e.target.value);
    }

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
                <input type='radio' name='answer' onChange={handleCheck} value='0'/>{item.answer[0]}
                <input type='radio' name='answer' onChange={handleCheck} value='1'/>{item.answer[1]}
            </div>
            <input type="button" value="이전" onClick={handlePrev}></input>
            <input type="button" value="검사 시작" onClick={handleNext} disabled={check ? false: true}></input>
        </div>
    );
}

export default Example;