import { useState, DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import s from './MobileNav.module.css';
import Link from 'next/link';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const MobileNav: FC<IProps> = ({ className, ...props }) => {

   return (
      <div
         className={cn(s.nav, className)}
         {...props}
      >
         <ul className={s.nav}>
            <li className={s.nav_link}>
               <Link href='/' >HOME</Link>
            </li>
            <li className={s.nav_link}>
               <Link href='/paintings' >PAINTINGS</Link>    
            </li>
            <li className={s.nav_link}>
               <Link href='/graphics' >GRAPHICS</Link>   
            </li>
            <li className={s.nav_link}>
               <Link href='/sculpture_and_ceramics' >SCULPTURE</Link>
            </li>
            <li className={s.nav_link}>
               <Link href='/about' >ABOUT</Link>   
            </li>
         </ul>
      </div>
   );
};