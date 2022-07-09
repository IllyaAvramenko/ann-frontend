import React, { DetailedHTMLProps, FC, HtmlHTMLAttributes } from 'react';
import cn from 'classnames';
import s from './Select.module.css';

interface IProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>{
   children: React.ReactNode
   name?: string
   id?: string
}

export const Select: FC<IProps> = ({ name, id, children, className, ...props }) => {
   return (
      <select 
         name={name}
         id={id}
         className={cn(s.select, className)}
         {...props}
      >
         {children}
      </select>
   );
};