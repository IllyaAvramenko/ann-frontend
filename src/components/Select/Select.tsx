import React, { DetailedHTMLProps, FC, HtmlHTMLAttributes } from 'react';
import cn from 'classnames';
import s from './Select.module.css';
import { RiArrowDownSFill } from 'react-icons/ri';

interface IProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>{
   children: React.ReactNode
   name?: string
   id?: string
   half?: boolean
}

export const Select: FC<IProps> = ({ name, id, children, half = false, className, ...props }) => {
   const ref = React.createRef<HTMLSelectElement>();

   const onIconClick = () => {
      ref.current?.click();
   };

   return (
      <div className={cn(s.select__wrapper, {
         [s.input__half]: half
      })}>
         <select 
            name={name}
            id={id}
            className={cn(s.select, className)}
            {...props}
         >
            {children}
         </select>
         <div className={cn(s.select__icon)} onClick={onIconClick}>
            <RiArrowDownSFill />
         </div>
      </div>
   );
};