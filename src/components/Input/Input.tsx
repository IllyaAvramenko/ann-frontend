/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FieldProps } from 'formik';
import { FC } from 'react';
import s from './Input.module.css';
import cn from 'classnames';

interface IputPropsType {
   label: string
   half?: boolean
}

export const Input: FC<IputPropsType & FieldProps> = ({
   half = false,
   field,
   form: { touched, errors },
   ...props 
}) => {
   const error = errors[field.name] as string;
   const isTouched = touched[field.name] as boolean;

   return (
      <div className={cn(s.input__wrapper, {
         [s.input__half]: half
      })}>
         <input 
            className={cn(s.input, {
               [s.input__error]: !!error && isTouched
            })} 
            {...field} 
            {...props}
         />

         {/* @ts-ignore */}
         {isTouched && error && (
            // @ts-ignore
            <div className={s.error}>{error}</div>
         )}
      </div>
   );
};