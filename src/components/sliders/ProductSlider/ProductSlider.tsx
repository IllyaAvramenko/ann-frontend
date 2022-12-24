// /* eslint-disable @typescript-eslint/ban-ts-comment */

import React, { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react';
import s from './ProductSlider.module.css';
import { Slide } from '../MyCarousel/Slide/Slide';
import { Carousel } from '../MyCarousel/Carousel';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   images: string[]
}

export const ArtSlider: FC<IProps> = ({ images }) => {
   // const childrenCount = React.Children.count(children);
   const [slide, setSlide] = useState<number>(0);

   return (
      <div>
         <Carousel
            slide={slide}
            setSlide={setSlide}
            className={s.slider}
         >
            {images.map(img => (
               <Slide key={img} className={s.slide}>
                  <div className={s.slide__wrapper}>
                     <img className={s.slide__image} src={img} />
                  </div>
               </Slide>
            ))}
         </Carousel>
         <div className={s.subSlider}>
            {images.map((img, index) => (
               <div 
                  className={s.subSlide}
                  onClick={() => setSlide(index)}
               >
                  <img style={{ width: '100%' }} src={img} />
               </div>
            ))}
         </div>
      </div>
   );
};