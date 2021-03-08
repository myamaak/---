import React, { useState, useEffect, useContext,useCallback, useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import './TestResult.css';
import API_KEY from '../config';

//isloading일때 다른 직업 버튼 무효화시키기
//gender 잘못 가져오는거 고치기
//메타태그/open graph 공유기능을 위해 추가! 
//https://velog.io/@byeol4001/Meta-Tag-OG%EC%98%A4%ED%94%88%EA%B7%B8%EB%9E%98%ED%94%84-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
//참고!

function RecruitInfo(){
    const { seq } = useParams();
    const { job } = useParams();
    const api_url = '';
    const [page, setPage] = useState(0);

    const getRecruit = useCallback(async ()=>{
        const res = await axios.get(`http://api.career.co.kr/open?id=VjfzNMrb5o8yb/LgS8rsPQ==&kw=${job}`);
        return res;
    },[job]);

    const thisPageData = useMemo(getRecruit,[]);

    console.log(thisPageData);


    return(
    <>
    <Link to= {'/result/'+ seq}>
        <button className="glow-button">결과 페이지로 돌아가기</button>
    </Link>
    <div>
        Powered by <a href="http://www.saramin.co.kr" target="_blank">취업 사람인</a>
    </div>
    </>
    );

}

export default RecruitInfo;