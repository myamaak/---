import React, { useState, useEffect, useContext,useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';
import { AnswersContext, UserContext } from '../context/Context';
import '../TestResult.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function Intro(){
    return(
        <div>
            <h2>직업가치관검사 결과표</h2>
            <p>직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다. 따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 또한 본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</p>
        </div>
    );
}

// function UserProfile(props){
//     return(
//         <table className="userProfile">
//           <thead>
//             <tr>
//                 <th>이름</th>
//                 <th>성별</th>
//                 <th>검사일</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//                 <td>{props.data.name}</td>
//                 <td>{props.data.gender}</td>
//                 <td>{props.data.date}</td>
//             </tr>
//           </tbody>
//         </table>
//     );
// }

const useStyles = makeStyles({
  table: {
    minWidth: 300,
    margin: "auto",
  },
});

function UserProfile(props){
  const classes = useStyles();
  return(
    <TableContainer>
    <Table className={classes.table} aria-label="simple table" >
      <TableHead>
        <TableRow>
          <TableCell> 이름 </TableCell>
          <TableCell > 성별 </TableCell>
          <TableCell > 날짜 </TableCell>
        </TableRow>
      </TableHead>
      <TableBody >
        <TableRow >
          <TableCell>{props.data.name}</TableCell>
          <TableCell>{props.data.gender}</TableCell>
          <TableCell>{props.data.date}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  );
}

class BarChart extends React.Component {

    render() {
  
      const state = {
          labels: this.props.label,
          datasets: [
            {
              backgroundColor: [
                'rgba(255, 154, 162, 0.5)',
                'rgba(255, 183, 178, 0.5)',
                'rgba(255, 218, 193, 0.5)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(226, 240, 203, 0.6)',
                'rgba(181, 234, 215, 0.5)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 154, 162, 1)',
              'rgba(255, 183, 178, 1)',
              'rgba(255, 218, 193, 1)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(226, 240, 203, 1)',
              'rgba(181, 234, 215, 1)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)'
            ],
              borderWidth: 1,
              data: this.props.data
            }
          ]
        }
  
      return (
        <div className ="chart-container">
          <Bar
            id = "barChart"
            data={state}
            width = {800}
            height ={500}
            options={{
              title:{
                display:true,
                text:'직업가치관결과',
                fontSize:20
              },
              legend:{
                display:false,
                position:'right'
              },
              responsive: false,
              maintainAspectRatio: false,
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true,
                      }
                    }]
                 }
            }}
          />
        </div>
      );
    }
  }
  
function RelatedJobs(props){
  //아 api 구조 너무 화가 난다..!
  let jobsTableContents = [];

  for (var i=0; i<props.factors.length; i++){
    let eachRow = props.data.map(([jobSeq, jobTitle, index])=>{
      return index==i+1?
       <a href ={ `http://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${jobSeq}`} 
       style={{marginRight:"10px"}}
       key={jobSeq}>
         {jobTitle}
       </a>:""
      });

    eachRow = eachRow.filter(function(element){ return element != "";});
    jobsTableContents.push(eachRow);
  }
 
  let finalContents = props.factors.map(function(value, ind){
    return[value,jobsTableContents[ind]]
  });

  finalContents = finalContents.filter(function(element){ return element[1] != "";});
  console.log(finalContents);
  
      return(
          <table>
            <caption>종사자 평균 학력별</caption>
            <thead>
              <tr>
                <th>분야</th>
                <th>직업명</th>
              </tr>
            </thead>
            <tbody>
              {finalContents.map(each=>{
                return(
                <tr key={each[0]}>
                  <td>{each[0]}</td>
                  <td>{each[1]}</td>
                </tr>
              )})}
            </tbody>
          </table>
      );
}

function RelatedMajors(props){
  let jobsTableContents = [];

  for (var i=0; i<props.factors.length; i++){
    let eachRow = props.data.map(each=>{
      return each[2]==i+1?
       <a href ={ `http://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${each[0]}`} 
       style={{marginRight:"10px"}}
       key={each[0]}>
         {each[1]}
       </a>:""
      });

    eachRow = eachRow.filter(function(element){ return element != "";});
    jobsTableContents.push(eachRow);
  }
 
  let finalContents = props.factors.map(function(value, ind){
    return[value,jobsTableContents[ind]]
  });

  finalContents = finalContents.filter(function(element){ return element[1] != "";});
      return(
          <table>
            <caption>종사자 평균 전공별</caption>
            <thead>
              <tr>
                <th>분야</th>
                <th>직업명</th>
              </tr>
            </thead>
            <tbody>
            {finalContents.map(each=>{
                return(
                <tr key={each[0]}>
                  <td>{each[0]}</td>
                  <td>{each[1]}</td>
                </tr>
              )})}
            </tbody>
          </table>
      );
}

function TestResult(){
    const { seq } = useParams();
    const test_result_api = `https://inspct.career.go.kr/inspct/api/psycho/report?seq=${seq}`;
    const {user, setUser} = useContext(UserContext);
    const {answers, setAnswers} = useContext(AnswersContext);

    const [userInfo, setUserInfo] = useState({});
    const [Score, setScore] = useState();
    const [maxScores, setMaxScores] = useState([-1,-1]);

    const jobs_api = `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${maxScores[0]}&no2=${maxScores[1]}`;
    const majors_api = `https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${maxScores[0]}&no2=${maxScores[1]}`;

    const [careersResult, setCareers] = useState();
    const [majorsResult, setMajors] = useState();

    const factors = ["능력발휘", "자율성", "보수", "안정성", "사회적 인정", "사회봉사", "자기계발", "창의성"];
    const careers = ['중졸이하','고졸','전문대졸','대졸','대학원졸'];
    const majors = ['계열무관','인문','사회','교육','공학','자연','의학','예체능'];

    const clearAll = e => { 
      setUser({name: '', gender:''});
      setAnswers([]);
    }

    //학력별 머시기 가져오는 함수
    const getJobs = useCallback(async()=>{
      const responseJobs = await axios.get(jobs_api);
      const responseMajors = await axios.get(majors_api);
      setCareers(responseJobs.data);
      setMajors(responseMajors.data);
    },[maxScores]);


    const getTestResult = useCallback(async()=>{
        const response = await axios.get(test_result_api);
        console.log(response);
        const gender = response.data.inspct.gender === 100323? "남성": "여성";
        const date = new Date(response.data.inspct.registDt);
        setUserInfo({name: response.data.inspct.nm, gender: gender ,date: date.toLocaleDateString()});

        const wonScore = response.data.result.wonScore.trim().split(" ");
        let formatScore = [];

        for(var i = 0; i<factors.length; i++){
            formatScore.push(Number(wonScore[i].slice(-1)));
        }
        setScore(formatScore);

        let firstMax = formatScore.indexOf(Math.max(...formatScore));
        formatScore[firstMax] = -1;
        let secondMax = formatScore.indexOf(Math.max(...formatScore));
        setMaxScores([firstMax+1, secondMax+1]);
        //함수로 제일 큰 값을 구하고 싶은데 useMemo없이 그냥 함수로 정의해도 될까?
    },[test_result_api]);

    useEffect(()=>{
      getTestResult();
    },[]);

    useEffect(()=>{
      getJobs();
    },[maxScores]);

    console.log(maxScores);

    return(
        <>
        <Intro></Intro>
        <UserProfile data={userInfo}></UserProfile>
        <BarChart label={factors} data={Score}></BarChart>
        <h2>가치관과 관련이 높은 직업</h2>
        {careersResult? <RelatedJobs factors={careers} data={careersResult}/> : ""}
        {majorsResult? <RelatedMajors factors={majors} data={majorsResult}/> : ""}
        <Link to="/"><button onClick={clearAll}>다시 검사하기</button></Link>
        </>
    );
}

export default TestResult;