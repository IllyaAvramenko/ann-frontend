// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import React, { FC, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// import s from './ProductSlider.module.css';

import React, { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react';
import cn from 'classnames';
import s from './ProductSlider.module.css';
import { Slide } from '../MyCarousel/Slide/Slide';
import { Carousel } from '../MyCarousel/Carousel';

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";

// // import required modules
// import { FreeMode, Navigation, Thumbs } from "swiper";

// interface IProps {
//    children?: React.ReactNode
// }

// export const Slider: FC<IProps> = () => {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);

//   return (
//     <>
//       <Swiper
//         style={{
//            // @ts-ignore
//             "--swiper-navigation-color": "#fff",
//             "--swiper-pagination-color": "#fff",
//             width: '100%',
//         }}
//         loop={true}
//         spaceBetween={10}
//         navigation={true}
//         // @ts-ignore
//         thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
//         modules={[FreeMode, Navigation, Thumbs]}
//         className="mySwiper2 productSlider"
//         slideClass={s.slide}
//         slideActiveClass={s.slideActive}
//       >
//          <SwiperSlide>
//             <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
//          </SwiperSlide>
//          <SwiperSlide>
//             <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
//          </SwiperSlide>
//          <SwiperSlide>
//             <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
//          </SwiperSlide>
//          <SwiperSlide>
//             <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
//          </SwiperSlide>
//       </Swiper>
//       <Swiper
//          // @ts-ignore
//          onSwiper={setThumbsSwiper}
//          loop={true}
//          spaceBetween={10}
//          slidesPerView={4}
//          freeMode={true}
//          watchSlidesProgress={true}
//          modules={[FreeMode, Navigation, Thumbs]}
//          className="mySwiper productSlider"
//          style={{ width: '100%' }}
//       >
         // <SwiperSlide>
         //    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
         // </SwiperSlide>
         // <SwiperSlide>
         //    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
         // </SwiperSlide>
         // <SwiperSlide>
         //    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
         // </SwiperSlide>
         // <SwiperSlide>
         //    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
         // </SwiperSlide>
//       </Swiper>
//     </>
//   );
// };

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   
}

export const ArtSlider: FC<IProps> = ({ children, className, ...props }) => {
   // const childrenCount = React.Children.count(children);
   const [slide, setSlide] = useState<number>(0);

   const images = [
      { src: 'https://swiperjs.com/demos/images/nature-1.jpg' },
      { src: 'https://swiperjs.com/demos/images/nature-2.jpg' },
      { src: 'https://swiperjs.com/demos/images/nature-3.jpg' },
      { src: 'https://swiperjs.com/demos/images/nature-4.jpg' },
   ];

   return (
      <div>
         <Carousel
            slide={slide}
            setSlide={setSlide}
         >
            <Slide>
               <img style={{ width: '100%' }} src="https://swiperjs.com/demos/images/nature-1.jpg" />
            </Slide>
            <Slide>
               <img style={{ width: '100%' }} src="https://swiperjs.com/demos/images/nature-2.jpg" />
            </Slide>
            <Slide>
               <img style={{ width: '100%' }} src="https://swiperjs.com/demos/images/nature-3.jpg" />
            </Slide>
            <Slide>
               <img style={{ width: '100%' }} src="https://swiperjs.com/demos/images/nature-4.jpg" />
            </Slide>
         </Carousel>
         <div className={s.subSlider}>
            {images.map((img, index) => (
               <div 
                  className={s.subSlide}
                  onClick={() => setSlide(index)}
               >
                  <img style={{ width: '100%' }} src={img.src} />
               </div>
            ))}
         </div>
      </div>
   );
};