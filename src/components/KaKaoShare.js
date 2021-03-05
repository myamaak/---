import React, { useEffect } from 'react'
import {KAKAO_KEY} from '../config';

const KakaoShareButton = () => {
  
    useEffect(() => {
    createKakaoButton()
  }, [])

  const createKakaoButton = () => {

    if (window.Kakao) {
      const kakao = window.Kakao

      if (!kakao.isInitialized()) {
        kakao.init(KAKAO_KEY)
      }
      
      kakao.Link.createDefaultButton({
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
          title: '직업심리검사 결과',
          description: '#나의_진로는? #검사하고_광명찾자',
          imageUrl: 'https://elice-api-cdn.azureedge.net/api/file/e632511170e442ab98163b5ba719ebc0/banner%402x.png?se=2021-03-18T00%3A15%3A00Z&sp=r&sv=2018-11-09&sr=b&sig=XZaUy4fmO9fPiL/qbVSaLpUaIfld58NDCCPC3TcdyE8%3D', 
          link: {
            webUrl: window.location.href,
          },
        },
        social: {
          likeCount: 77,
          commentCount: 55,
          sharedCount: 333,
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          }
        ],
      })
    }
  }
  return (
    <div className="kakao-share-button">
      {/* Kakao share button */}
      <button id="kakao-link-btn" className="no-style">
      <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png" />
      </button>
    </div>
  )
}

export default KakaoShareButton;