import s from './SearchItem.module.css';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import Link from 'next/link';
import { Htag, P } from '../../../components';
import cn from 'classnames';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   title: string
   img: string
   price: number
   url: string
}

export const SearchItem: FC<IProps> = ({ title, img, price, url, className, ...props }) => {
   return (
      <div
         className={cn(s.item, className)}
         {...props}
      >
         <div className={s.right}>
            <Link href={url}>
               <div className={s.image}>
                  <img src={img} alt="" />
               </div>
            </Link>
            <div>
               <Link  href={url}>
                  <Htag
                     tag='h4'
                     className={s.title}
                  >
                     {title}
                  </Htag>
               </Link>
               {/* <div className={s.remove}>
                  <P 
                     size='m'
                     onClick={() => onRemove(slug)}
                  >
                     Remove
                  </P>
               </div> */}
            </div>
         </div>
         <div className={s.left}>
            <P  className={s.price}>€{price},00</P>
         </div>
      </div>
   );
};