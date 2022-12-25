import { DetailedHTMLProps, FC, HtmlHTMLAttributes } from 'react';
import s from './Section.module.css';
import cn from 'classnames';

import { Button } from '../Button/Button';
import { Htag } from '../HTag/Htag';
import { P } from '../P/P';

interface IProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
   img: string
   title: string
   text: string
   btnText: string
   onBtnClick: () => void
   reversed?: boolean
}

export const Section: FC<IProps> = ({ img, title, text, btnText, onBtnClick, reversed, className, ...props }) => {
   return (
      <section 
         className={cn(s.section, className, {
            [s.reversed]: reversed
         })}
         {...props}
      >
         <div className={s.image}>
            <img src={img} alt="" />
         </div>
         <div className={s.content}>
            <div className={s.contentWrap}>
               <Htag tag='h2' className={s.title}>{title}</Htag>
               <P size='l' className={s.text}>{text}</P>
               <Button
                  onClick={onBtnClick}
               >{btnText}</Button>  
            </div>  
         </div>
      </section>
   );
};