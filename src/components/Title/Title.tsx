import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import s from './Title.module.css';
import cn from 'classnames';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
   children: React.ReactNode
}

export const Title: FC<IProps> = ({ children, className, ...props }) => {
   return (
      <h1
         className={cn(s.title, className)} 
         {...props}
      >
         {children}
      </h1>
   );
};