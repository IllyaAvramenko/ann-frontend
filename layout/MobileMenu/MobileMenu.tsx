import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import s from './MobileMenu.module.css';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   isOpen: boolean
   setIsOpen: (isOpen: boolean) => void
}

export const MobileMenu: FC<IProps> = ({ isOpen, setIsOpen, className, ...props }) => {
   return (
      <div
         className={cn(s.menu, className)}
         {...props}
      >
         <div 
            className={cn(s.hamburger_lines, {
               [s.open]: isOpen
            })}
            onClick={() => setIsOpen(!isOpen)}
         >
            <span className={cn(s.line, s.line1)}></span>
            <span className={cn(s.line, s.line2)}></span>
            <span className={cn(s.line, s.line3)}></span>
         </div>  
      </div>
   );
};