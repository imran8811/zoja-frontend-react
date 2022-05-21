import React, { FC } from "react";
import { useRouter } from "next/dist/client/router";

import { Swiper, SwiperSlide } from 'swiper/react';

const HomeBanner: FC = () => {
  const router = useRouter();
  return (
    <div className="home-banner">
      <Swiper slidesPerView={1}>
        <SwiperSlide><img src="/assets/images/home-banner.jpg" alt="home banner" /></SwiperSlide>
        <SwiperSlide><img src="/assets/images/home-banner.jpg" alt="home banner" /></SwiperSlide>
        <SwiperSlide><img src="/assets/images/home-banner.jpg" alt="home banner" /></SwiperSlide>
        <SwiperSlide><img src="/assets/images/home-banner.jpg" alt="home banner" /></SwiperSlide>
      </Swiper>
      <div className="search-area">
        <h1>Rishta Online</h1>
        <p>Best place to find online rishta</p>
        <div className="mt-3">
          <button 
            type="button"
            className="btn btn-primary"
            onClick={() => {
              router.push({
                pathname: '/search',
                query: {
                  type: 'bride'
                }
              })
            }}><strong>Search Bride</strong></button>
          <button 
            type="button"
            className="btn btn-success"
            onClick={() => {
              router.push({
                pathname: '/search', 
                query: {
                  type: 'groom'
                }
              })
            }}><strong>Search Groom</strong></button>
        </div>
      </div>
    </div>
  )
}

export default HomeBanner;