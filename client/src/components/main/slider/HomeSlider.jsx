import React, { useEffect, useState } from 'react';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

function HomeSlider() {
    const [index,setIndex]=useState(false)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const onChanege=()=>{
        setIndex(!index)
        document.querySelector('.slider-text-content').style.opacity=0
        document.querySelector('.slider-text-content').style.transition='none'
        document.querySelector('.slider-text-content').style.left=windowDimensions.width<992?'10px':'100px'
        document.querySelector('.active').addEventListener('transitionend',()=>{
            document.querySelector('.slider-text-content').style.transition='all 0.8s'
            document.querySelector('.slider-text-content').style.opacity=1
            document.querySelector('.slider-text-content').style.left=windowDimensions.width<992?'40px':'140px'
        })
    }

    useEffect(()=>{
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        const interval=setInterval(()=>{
            setIndex(!index)
            let left1=0
            let left2=50
            if(windowDimensions.width<=320){
                left1=0
                left2=30
            }
            else if(windowDimensions.width<576&windowDimensions.width>320){
                left1=10
                left2=50
            }else if(windowDimensions.width>=576&windowDimensions.width<992){
                left1=40
                left2=90
            }else if(windowDimensions.width>=992){
                left1=80
                left2=120
            }
            document.querySelector('.slider-text-content').style.opacity=0
            document.querySelector('.slider-text-content').style.left=left1+'px'
            document.querySelector('.slider-text-content').style.transition='none'
            document.querySelector('.active').addEventListener('transitionend',()=>{
                document.querySelector('.slider-text-content').style.transition='all 0.8s'
                document.querySelector('.slider-text-content').style.opacity=1
                document.querySelector('.slider-text-content').style.left=left2+'px'
        })
        },3000)
        return ()=>{
            clearInterval(interval)
            window.removeEventListener('resize', handleResize)
        }
    },[index,windowDimensions])

    return (
        <section className="home-slider">
            <div className="slider-container">
                <div className="slider-text-content">
                    <h1>đủ món hấp dẫn</h1>
                    <h2>Chỉ từ 20.000đ</h2>
                </div>
                <div className={index?'slider-content':'slider-content active'} style={{backgroundImage:'url(https://res.cloudinary.com/luutheviet/image/upload/v1630208032/food/demo2-2703159401_k7ywe5.jpg)'}}>
                </div>
                <div className={index?'slider-content active':'slider-content'} style={{backgroundImage:'url(https://res.cloudinary.com/luutheviet/image/upload/v1630208041/food/demo2-2757655592_r9wgk0.jpg)'}}>
                </div>
            </div>
            <button id="slider-btn-left">
                <i className="fas fa-chevron-left" onClick={onChanege}></i>
            </button>
            <button id="slider-btn-right">
                <i className="fas fa-chevron-right" onClick={onChanege}></i>
            </button>
        </section>
    );
}

export default HomeSlider;