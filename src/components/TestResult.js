import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import API_KEY from '../config';
import {Bar} from 'react-chartjs-2';


function Intro(){
    return(
        <div>
            <h2>직업가치관검사 결과표</h2>
            <p>직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다. 따라서 여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수 있습니다. 직업가치관검사는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를 알려줍니다. 또한 본인이 가장 중요하게 생각하는 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.</p>
        </div>
    );
}

function UserProfile(props){
    return(
        <table>
          <thead>
            <tr>
                <th>이름</th>
                <th>성별</th>
                <th>검사일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>{props.data.name}</td>
                <td>{props.data.gender}</td>
                <td>{props.data.date}</td>
            </tr>
          </tbody>
        </table>
    );
}

class BarChart extends React.Component {

    render() {
  
      const state = {
          labels: this.props.label,
          datasets: [
            {
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: this.props.data
            }
          ]
        }
  
      return (
        <div>
          <Bar
            data={state}
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
  var jobsTableContents = [];


  for (var i=0; i<props.factors.length; i++){
    // var eachRow = "";
    var eachRow = props.data.map(each=>{
      return each[2]==i+1?
      <>
       <a href ={ `http://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${each[0]}`}>{each[1]}</a>{" "}
       </>:""
      });
    // for(var j=0; j<props.data.length; j++){
    //   if (props.data[j][2]==i+1){
    //     eachRow+=`<a href ="http://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${props.data[j][0]}">${props.data[j][1]}</a>`;
    //   }
    // }
    eachRow = eachRow.filter(function(element){ return element != "";});
    jobsTableContents.push(eachRow);
  }
 
  console.log(jobsTableContents)
  var finalContents = props.factors.map(function(value, ind){
    return[value,jobsTableContents[ind]]
  })
 
  console.log(finalContents);
  //각각 만든다음 map으로 zip같이 만들기..?
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
                return(each[1] !=""? <tr>
              <td>{each[0]}</td>
              <td>{each[1]}</td>
              </tr>: "")
              })}
            </tbody>
          </table>
      );
}

function RelatedMajors(props){
  //아 api 구조 너무 화가 난다..!
  var jobsTableContents = [];


  for (var i=0; i<props.factors.length; i++){
    // var eachRow = "";
    var eachRow = props.data.map(each=>{
      return each[2]==i?
      <>
       <a href ={ `http://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${each[0]}`}>{each[1]}</a>{" "}
       </>:""
      });
    eachRow = eachRow.filter(function(element){ return element != "";});
    jobsTableContents.push(eachRow);
  }
 
  console.log(jobsTableContents)
  var finalContents = props.factors.map(function(value, ind){
    return[value,jobsTableContents[ind]]
  })

  console.log(finalContents);
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
                return(each[1] !=""? <tr>
              <td>{each[0]}</td>
              <td>{each[1]}</td>
              </tr>: "")
              })}
            </tbody>
          </table>
      );
}

function TestResult(){
    const { seq } = useParams();
    const test_result_api = `https://inspct.career.go.kr/inspct/api/psycho/report?seq=${seq}`;

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

    //학력별 머시기 가져오는 함수
    const getJobs = useCallback(async()=>{
      const responseJobs = await axios.get(jobs_api);
      const responseMajors = await axios.get(majors_api);
      setCareers(responseJobs.data);
      setMajors(responseMajors.data);
      console.log(careersResult);
    },[maxScores]);


    const getTestResult = useCallback(async()=>{
        const response = await axios.get(test_result_api);
        console.log(response);
        const gender = response.data.inspct.gender === 100323? "남성": "여성";
        const date = new Date(response.data.inspct.registDt);
        setUserInfo({name: response.data.inspct.nm, gender: gender ,date: date.toLocaleDateString()});

        const wonScore = response.data.result.wonScore.trim().split(" ");
        var formatScore = [];

        for(var i = 0; i<factors.length; i++){
            formatScore.push(Number(wonScore[i].slice(-1)));
        }
        setScore(formatScore);

        var firstMax = formatScore.indexOf(Math.max(...formatScore));
        formatScore[firstMax] = -1;
        var secondMax = formatScore.indexOf(Math.max(...formatScore));
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
        {/* <RelatedJobs data={careersResult[0]}/> */}
        </>
    );
}





//https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
//https://www.createwithdata.com/react-bar-chart

export default TestResult;