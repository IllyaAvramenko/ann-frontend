import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import s from './Button.module.css';
import cn from 'classnames';

interface IProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
   appearance?: 'primary' | 'secondary'
}

export const Button: FC<IProps> = ({ appearance = 'primary', children, className, ...props }) => {
   return (
      <button
         className={cn(s.button, className, {
            [s.primary]: appearance == 'primary',
            [s.secondary]: appearance == 'secondary'
         })}
         {...props}
      >
         {children}
      </button>
   );
};