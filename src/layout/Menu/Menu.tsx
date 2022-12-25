import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import s from './Menu.module.css';
import { Htag } from '../../components';
import Link from 'next/link';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Menu: FC<IProps> = React.memo(({ className, ...props }) => {
   return (
      <menu
         {...props}
         className={cn(className, s.menu, 'afterline')}
      >
         <div className={s.title}>
            <Link href='/'>
               <Htag tag='h1' style={{ cursor: 'pointer' }}>Anna Budzinska Art Shop</Htag>
            </Link>
         </div>
         <div className={s.nav}>
            <ul>
               <li>
                  <Link href='/' >HOME</Link>
               </li>
               <li>
                  <Link href='/paintings' >PAINTINGS</Link>   
               </li>
               <li>
                  <Link href='/graphics' >GRAPHICS</Link>   
               </li>
               <li>
                  <Link href='/sculpture_and_ceramics' >SCULPTURE</Link>
               </li>
               <li>
                  <Link href='/about' >ABOUT</Link>   
               </li>
            </ul>
         </div>
      </menu>
   );
});