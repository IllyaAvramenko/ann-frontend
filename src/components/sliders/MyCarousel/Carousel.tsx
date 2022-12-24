import React, { FC, DetailedHTMLProps, HTMLAttributes, useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import s from './Carousel.module.css';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  infinite?: boolean
  children: React.ReactNode,
  slide: number,
  setSlide: (numberSlide: number) => void
}

export const Carousel: FC<IProps> = ({ slide, setSlide, className, children }) => {

  const [offset, setOffset] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0); // If window change it's size this value also need update width

  const windowElRef = useRef<any>();

  const childrenCount = React.Children.count(children);

  useEffect(() => {
    setWindowWidth(windowElRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    setOffset(() => {
      const newOffset = -(slide * windowWidth);

      return newOffset;
    });
  }, [slide]);

  const handleLeft = () => {
    if (slide == (childrenCount - 1)) {
      setSlide(0);
      return;
    }

    setSlide(slide + 1);
  };

  const handleRight = () => {
    if (slide == 0) {
      setSlide(childrenCount - 1);
      return;
    }
    setSlide(slide - 1);
  };

  return (
    <div className={cn(s.slider, className)}>
      <div 
        className={s.leftArrow}
        onClick={() => handleRight()} style={{ color: '#000' }}
      >
        <Arrow style={{ transform: 'rotate(180deg)' }} />
      </div>
      <div className={s.window} ref={windowElRef}>
        <div
          className={s.pagesContainer}
          style={{
            transform: `translateX(${offset}px)`,
            transitionDuration: `${300}ms`,
          }}
        >
          {children}
        </div>
      </div>
      <div 
        className={s.rightArrow}
        onClick={() => handleLeft()} style={{ color: '#000' }}
      >
        <Arrow/>
      </div>
    </div>
  );
};

interface ArrowProps extends DetailedHTMLProps<HTMLAttributes<SVGElement>, SVGAElement> {}

const Arrow: FC<ArrowProps> = ({ style }) => {

   return (
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
         viewBox="0 0 330 330" style={{ width: '50px', height: '50px', fill: '#f25c54', cursor: 'pointer', zIndex: 10, ...style }}>
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