import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import s from './Button.module.css';
import cn from 'classnames';

interface IProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
   appearance?: 'primary' | 'secondary'
   size?: 's' | 'm' | 'l'
}

export const Button: FC<IProps> = ({ appearance = 'primary', size = 'm', children, className, ...props }) => {
   return (
      <button
         className={cn(s.button, className, {
            [s.primary]: appearance == 'primary',
            [s.secondary]: appearance == 'secondary',
            [s.small]: size == 's',
            [s.middle]: size == 'm',
            [s.large]: size == 'l',
         })}
         {...props}
      >
         {children}
      </button>
   );
};