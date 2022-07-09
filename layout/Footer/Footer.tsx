import React, { FC, DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import s from './Footer.module.css';
import { Htag } from '../../components/HTag/Htag';
import { P } from '../../components/P/P';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Footer: FC<IProps> = React.memo(({ className, ...props }) => {
   return (
      <div
         {...props}
         className={cn(className, s.footer)}
      >
         <div className={s.wrapper}>
            <div className={s.container}>
               <Htag tag={'h3'}>Links</Htag>
               <P size='s'>Search</P>
            </div>
            <div className={s.container}>
               <Htag tag={'h3'}>Latest News</Htag>
            </div>
            <div className={s.container}>
               <Htag tag={'h3'}>Follow Us</Htag>
               <div className={s.icons}>
                  <TiktokIcon/>
                  <InstIcon/>
               </div>
            </div>
            <div className={s.container}>
               <Htag tag={'h3'}>Newsletter</Htag>
               <P size='s'>Sign up for the latest news, offers and styles</P>
            </div>
         </div>
      </div>
   );
});

const InstIcon = () => {
   return (
      <div
         className={s.icon}
      >
         <svg fill="#403b37" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16" width="26px" height="26px">
            <path d="M 4.773438 1 C 2.695313 1 1 2.695313 1 4.773438 L 1 10.230469 C 1 12.304688 2.695313 14 4.773438 14 L 10.230469 14 C 12.304688 14 14 12.304688 14 10.226563 L 14 4.773438 C 14 2.695313 12.304688 1 10.226563 1 Z M 4.773438 2 L 10.226563 2 C 11.765625 2 13 3.234375 13 4.773438 L 13 10.226563 C 13 11.765625 11.765625 13 10.230469 13 L 4.773438 13 C 3.234375 13 2 11.765625 2 10.230469 L 2 4.773438 C 2 3.234375 3.234375 2 4.773438 2 Z M 11.5 3 C 11.222656 3 11 3.222656 11 3.5 C 11 3.777344 11.222656 4 11.5 4 C 11.777344 4 12 3.777344 12 3.5 C 12 3.222656 11.777344 3 11.5 3 Z M 7.5 4 C 5.574219 4 4 5.574219 4 7.5 C 4 9.425781 5.574219 11 7.5 11 C 9.425781 11 11 9.425781 11 7.5 C 11 5.574219 9.425781 4 7.5 4 Z M 7.5 5 C 8.886719 5 10 6.113281 10 7.5 C 10 8.886719 8.886719 10 7.5 10 C 6.113281 10 5 8.886719 5 7.5 C 5 6.113281 6.113281 5 7.5 5 Z"/>
         </svg>
      </div>
   );
};

const TiktokIcon = () => {
   return (
      <div 
         style={{ marginRight: '5px' }}
         className={s.icon}
      >
         <svg fill="#403b37" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="25px" height="25px">
            <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"/>
         </svg>
      </div>
   );
};