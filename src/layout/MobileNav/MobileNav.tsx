import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import s from './MobileNav.module.css';
import Link from 'next/link';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   onNavClick?: (item: { path: string, name: string }) => void
}

const NAV_LINKS = [
   { path: '/', name: 'Home'},
   { path: '/paintings', name: 'Paintings'},
   { path: '/graphics', name: 'Graphics'},
   { path: '/sculpture_and_ceramics', name: 'Sculpture'},
   { path: '/about', name: 'About'},
];

export const MobileNav: FC<IProps> = ({ className, onNavClick, ...props }) => {
   return (
      <div
         className={cn(s.nav, className)}
         {...props}
      >
         <ul className={s.nav}>
            {NAV_LINKS.map(item => (
               <li className={s.nav_link} key={item.path} onClick={() => onNavClick && onNavClick(item)}>
                  <Link href={item.path} >{item.name.toUpperCase()}</Link>
               </li>
            ))}
            {/* <li className={s.nav_link}>
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
            </li> */}
         </ul>
      </div>
   );
};