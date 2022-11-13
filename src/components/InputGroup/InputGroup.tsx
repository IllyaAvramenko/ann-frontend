import { DetailedHTMLProps, FC, HtmlHTMLAttributes } from 'react';
import s from './InputGroup.module.css';
import cn from 'classnames';
import { Htag } from '../HTag';

interface IProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   title?: string
}

export const InputGroup: FC<IProps> = ({ title, children, ...props }) => (
   <div
      className={cn(s.inputGroup)}
      {...props}
   >
      <Htag
         tag='h4'
         className={s.inputGroup__title}
      >{title}</Htag>
      <div 
         className={s.inputGroup__wrapper}
      >
         {children}
      </div>
   </div>
);