import { DetailedHTMLProps, FC, HtmlHTMLAttributes } from 'react';
import { P } from '../P/P';
import s from './OrderItem.module.css';

interface IProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   title: string
   price: number
   img?: string
}

export const OrderItem: FC<IProps> = ({ title, price, img, ...props }) => {
   return (
      <div
         className={s.item}
         {...props}
      >
         <div
            className={s.item__right}
         >
            <div className={s.item__right_image}>
               <img src={img} />
            </div>
            <div className={s.item__right_title}>
               <P>{title}</P>
            </div>
         </div>
         <div
            className={s.item__left}
         >
            <span>
               €{price}.00
            </span>
         </div>
      </div>
   );
};