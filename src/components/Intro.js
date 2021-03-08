import { Link } from 'react-router-dom';
import "./intro.css";


function Intro(){

    return(
        <div className="container">
            <Link to='/intro' className="box" style={{marginTop: "-10px"}}>
                <span className="title" >직업가치관검사</span>
                <span className="content">직업과 관련된 다양한 가치 중, 어떤 가치를 주요하게 만족시키고 싶은지 알아볼 수 있습니다.</span>
            </Link>
            <br/>
            <a href="https://www.career.go.kr/inspct/web/psycho/ready" className="box">
                <span className="title" >진로개발준비도검사</span>
                <span className="content">진로목표 달성을 위해 필요한 사항들에 대한 준비 정도를 알아볼 수 있습니다.</span>
            </a>
            <br/>
            <a href="https://www.career.go.kr/inspct/web/psycho/effect" className="box">
                <span className="title" >주요능력효능감검사</span>
                <span className="content">직업과 관련된 특정 능력에 대해 스스로의 자신감 정보를 알아볼 수 있습니다.</span>
            </a>
            <br/>
            <a href="https://www.career.go.kr/inspct/web/psycho/engineering" className="box">
                <span className="title" >이공계전공적합도검사</span>
                <span className="content">대학의 이공계 내 세부전공별 적합도를 알아볼 수 있습니다.</span>
            </a>
        </div>
    );

}

export default Intro;