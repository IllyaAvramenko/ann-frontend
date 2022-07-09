import React, { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import s from "./MainSlider.module.css";
import cn from 'classnames';


export const MainSlider: FC = () => {

   const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
   const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
   const [paginationRef, setPaginationRef] = useState<HTMLElement | null>(null); 

   return (
      <>
      <Swiper
         cssMode={true}
         navigation={{
            enabled: true,
            prevEl, 
            nextEl,
         }}
         pagination={{
            clickable: true,
            el: paginationRef,
            bulletClass: `${s.bullet}`,
            bulletActiveClass: `${s.bulletActive}`,
            horizontalClass: `${s.paginationHoriz}`
         }}
         mousewheel={true}
         keyboard={true}
         modules={[Navigation, Pagination, Mousewheel, Keyboard]}
         className={cn('mySwiper', s.slider)}
      >
         <SwiperSlide className={s.slide}>
            <img src="https://via.placeholder.com/1000" alt="" />
         </SwiperSlide>
         <SwiperSlide className={s.slide}>
            <img src="https://via.placeholder.com/1000" alt="" />
         </SwiperSlide>
         <SwiperSlide className={s.slide}>
            <img src="https://via.placeholder.com/1000" alt="" />
         </SwiperSlide>
         <SwiperSlide className={s.slide}>
            <img src="https://via.placeholder.com/1000" alt="" />
         </SwiperSlide>
         <SwiperSlide className={s.slide}>
            <img src="https://via.placeholder.com/1000" alt="" />
         </SwiperSlide>
      </Swiper>
      <div className={s.nav}>
         <span ref={(node) => setPrevEl(node)} >
            <Arrow style={{ transform: 'rotate(180deg)' }} />
         </span>
         <div ref={(node) => setPaginationRef(node)} className={s.pagination}></div>
         <span ref={(node) => setNextEl(node)}>
            <Arrow />
         </span>
      </div>
      </>
   );
};

interface ArrowProps extends DetailedHTMLProps<HTMLAttributes<SVGElement>, SVGAElement> {}

const Arrow: FC<ArrowProps> = ({ style }) => {

   return (
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
         viewBox="0 0 330 330" style={{ width: '12px', height: '12px', fill: '#f25c54', cursor: 'pointer', ...style }}>
      <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
         c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
         C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
         C255,161.018,253.42,157.202,250.606,154.389z"/>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
</svg>

   );
};