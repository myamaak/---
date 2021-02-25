import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import API_KEY from '../config';
import {Bar} from 'react-chartjs-2';

function TestResult(){
    const { seq } = useParams();
    const test_result_api = `https://inspct.career.go.kr/inspct/api/psycho/report?seq=${seq}`;
    const jobs_api = ``;
    const majors_api = ``;
    const [userInfo, setUserInfo] = useState({});
    const [Score, setScore] = useState();
    const factors = ["능력발휘", "자율성", "보수", "안정성", "사회적 인정", "사회봉사", "자기계발", "창의성"];

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

    });

    useEffect(()=>{
        getTestResult();
    },[])

    console.log(Score);

    return(
        <>
        <Intro></Intro>
        <UserProfile data={userInfo}></UserProfile>
        <BarChart label={factors} data={Score}></BarChart>
        <h2>가치관과 관련이 높은 직업</h2>
        </>
    );
}

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
            <tr>
                <th>이름</th>
                <th>성별</th>
                <th>검사일</th>
            </tr>
            <tr>
                <th>{props.data.name}</th>
                <th>{props.data.gender}</th>
                <th>{props.data.date}</th>
            </tr>
        </table>
    );
}


class BarChart extends React.Component {

  render() {

    const state = {
        labels: this.props.label,
        datasets: [
          {
            label: this.props.label,
            //label에서 array 전체가 아니라 마우스 올려놓은 특성만 보이게 하는 법? (사진 캡쳐해둠)
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


//https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
//https://www.createwithdata.com/react-bar-chart

export default TestResult;