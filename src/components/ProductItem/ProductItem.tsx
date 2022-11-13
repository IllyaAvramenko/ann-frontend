import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import s from './ProductItem.module.css';
import cn from 'classnames';
import { Htag } from '../HTag/Htag';
import { P } from '../P/P';
import Link from 'next/link';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   title: string
   price: number
   img?: string
   description?: string
   url: string
}

export const ProductItem: FC<IProps> = ({ description, img, price, title, url, className, ...props }) => {
   return (
      <div
         className={cn(s.item, className)}
         {...props}
      >
         <Link href={url}>
            <div className={s.itemWrap}>
               <div className={s.photo}>
                  <img src={img || ''} alt="" />
               </div>
               <div className={s.content}>
                  <Htag tag='h3'>{title}</Htag>
                  <P size='s'>{description}</P>
                  <span className={s.price}>€{price}</span>
               </div>
            </div>
         </Link>
      </div>
   );
};