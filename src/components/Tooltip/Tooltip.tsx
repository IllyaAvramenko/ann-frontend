/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
   children: React.ReactNode;
   // selector: string;
}

export const Tooltip: FC<IProps> = ({ children }) => {
   const [isMounted, setIsMounted] = useState<boolean>(false);

   useEffect(() => {
      setIsMounted(true);
      return () => {
         setIsMounted(false);
      };
   }, []);
   
   // @ts-ignore
   return isMounted ? createPortal(children, document.querySelector('#tooltip')) : null;
};