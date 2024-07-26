import { useEffect, useState } from 'react'
import styled from "styled-components";
// assets
import Bg1 from "../assets/images/banner-img.jfif"
import Bg2 from "../assets/images/banner-img2.png"
import Bg3 from "../assets/images/banner-img3.jpg"
import Vector1 from "../assets/images/Vector.png"
import Vector2 from "../assets/images/Vector2.png"

function Banner() {
    const bannerList = [Bg1, Bg2, Bg3]
    const [slide, setSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            if (slide !== bannerList.length - 1) {
                setSlide(slide + 1)
            } else {
                setSlide(0)
            }
        }, 3000)
        return () => {
            clearInterval(timer); // timer 함수를 clearInterval을하여 return 한다.
        };
    }, [slide])

    const handleSlidePrev = () => {
        if (slide !== 0) {
            setSlide(slide - 1)
        } else {
            setSlide(bannerList.length - 1)
        }
    }

    const handleSlideNext = () => {
        if (slide !== bannerList.length - 1) {
            setSlide(slide + 1)
        } else {
            setSlide(0)
        }
    }

    return (
        <BannerContainer>
            <img src={Vector1} className="swiper1" alt="" onClick={handleSlidePrev} />
            <Slide style={{ transform: `translateX(-${1920 * slide}px)` }}>
                {bannerList.map((b, i) => {
                    return <li key={i}>
                        <img src={b} alt="" />
                    </li>
                })}
            </Slide>
            <img src={Vector2} className="swiper2" alt="" onClick={handleSlideNext} />
            <ul className="dot-container" >
                {bannerList.map((_, i) => {
                    return <li key={i} className={`dot ${slide === i ? "on" : ""}`}></li>
                })}
            </ul>
        </BannerContainer>
    )
}

const BannerContainer = styled.div`
    width: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;
   .swiper1 {
    z-index: 1;
    position: absolute;
    top: 230px;
    left: 30px;
    cursor: pointer;
   }
   .swiper2 {
    right: 60px;
    bottom: 240px;
    position: absolute;
    cursor: pointer;
   }
   .dot-container {
    position: absolute;
    width: 100%;
    display: flex;
    bottom: 25px;
    left: 50%;
}
.dot {
    width: 6px;
    height: 6px;
    background-color: white;
    border-radius: 3px;
    margin-right: 6px;
}
.on{
    background-color: black;
}
`

const Slide = styled.ul`
    width: 100%;
    height: 500px;
    display: flex;
    li {
        img {
            width:1920px;
            height: 500px;
        }
    }
`

export default Banner