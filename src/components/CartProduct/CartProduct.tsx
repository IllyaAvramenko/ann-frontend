import React, { DetailedHTMLProps, FC, HtmlHTMLAttributes } from 'react';
import s from './CartProduct.module.css';
import cn from 'classnames';
import Link from 'next/link';
import { Htag } from '../HTag/Htag';
import { P } from '../P/P';

interface IProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   title: string
   img: string
   price: number
   slug: string
   url: string
   onRemove: (slug: string) => void
}

export const CartProduct: FC<IProps> = React.memo(({ title, slug, img, url, price, className, onRemove, ...props }) => {
   return (
      <div
         className={cn(s.product, className)}
         {...props}
      >
         <div className={s.right}>
            <Link href={url}>
               <div className={s.image}>
                  <img src={img} alt="" />
               </div>
            </Link>
            <div className={s.right__text}>
               <Link  href={url}>
                  <Htag 
                     tag='h2'
                     className={s.title}
                  >
                     {title}
                  </Htag>
               </Link>
               <div className={s.remove}>
                  <P 
                     size='m'
                     onClick={() => onRemove(slug)}
                  >
                     Remove
                  </P>
               </div>
            </div>
         </div>
         <div className={s.left}>
            <div className={s.price}><strong>€{price},00</strong></div>
         </div>
      </div>
   );
});