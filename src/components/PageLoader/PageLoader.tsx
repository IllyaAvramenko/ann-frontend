import React, { useEffect, useState } from 'react';
import { Spinner } from '../Spinner';
import { Tooltip } from '../Tooltip';
import s from './PageLoader.module.css';

export const PageLoader = () => {
   const [isMounted, setIsMounted] = useState<boolean>(false);

   useEffect(() => {
      setIsMounted(true);
      return () => {
         setIsMounted(false);
         document.body.style.overflow = 'auto';
      };
   }, []);

   useEffect(() => { // Set overflow hidden when loader is shown
      if (isMounted) {
         document.body.style.overflow = 'hidden';
      }
   }, [isMounted]);

   if (!isMounted) return null; // This check to be sure that window object exist

   return <Tooltip>
      <div className={s.pageLoader} style={{ marginTop: `${window.pageYOffset <= 45 ? 45 : window.pageYOffset}px` }}>
         <Spinner/>
      </div>
   </Tooltip>;
};