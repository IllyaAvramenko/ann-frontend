/* eslint-disable @typescript-eslint/ban-ts-comment */
import cn from 'classnames';
import { FieldProps } from 'formik';
import { createRef, FC } from 'react';
import s from './FormikSelect.module.css';
import { RiArrowDownSFill } from "react-icons/ri";

export const FormikSelect: FC<{ half: boolean, children?: React.ReactNode } & FieldProps> = ({ 
   half = false,
   field,
   form: { touched, errors },
   children,
   ...props 
}) => {

   const ref = createRef<HTMLSelectElement>();

   const onIconClick = () => {
      ref.current?.click();
   };

   return (
      <div className={cn(s.select__wrapper, {
         [s.input__half]: half
      })}>
         <select className={s.select} {...field} {...props} ref={ref}>
            {children}
         </select>
         <div className={cn(s.select__icon)} onClick={onIconClick}>
            <RiArrowDownSFill />
         </div>

         {/* @ts-ignore */}
         {touched[field.name] && errors[field.name] && (
            // @ts-ignore
            <div className="error">{errors[field.name]}</div>
         )}
      </div>
   );
};