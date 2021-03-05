import React from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import './TestResult.css';

function TestFinish(){
    const { seq } = useParams();

    return(
        <div className="finish">
            <h2>검사가 완료되었습니다</h2>
            <p>
            검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려주고,
            <br/>
            중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.
            </p>
            <Link to ={'/result/'+seq}><input className="glow-button" type="submit" value="결과 보기"/></Link>
        </div>
    );
}

export default TestFinish;