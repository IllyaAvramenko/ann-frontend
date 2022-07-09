import React, { DetailedHTMLProps, HtmlHTMLAttributes } from 'react';
import s from './P.module.css';
import cn from 'classnames';

interface IProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>{
   children: React.ReactNode
   size?: 's' | 'm' | 'l'
}

export const P: React.FC<IProps> = React.memo(({ children, size = 'm', className, ...props }) => {
   return (
      <p 
         className={cn(s.p, className, {
            [s.small]: size == 's',
            [s.medium]: size == 'm',
            [s.large]: size == 'l'
         })}
         {...props}
      >
         {children}
      </p>
   );
});