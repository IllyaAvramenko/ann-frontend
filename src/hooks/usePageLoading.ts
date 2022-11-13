import { useEffect, useState } from 'react';
import Router from 'next/router';

export const usePageLoading = () => {
   const [isLoading, setIsLoading] = useState<boolean>(false);

   useEffect(() => {
      Router.events.on('routeChangeStart', () => setIsLoading(true));
      Router.events.on('routeChangeComplete', () => setIsLoading(false));
      Router.events.on('routeChangeError', () => setIsLoading(false));
      return () => {
         Router.events.off('routeChangeStart', () => setIsLoading(true));
         Router.events.off('routeChangeComplete', () => setIsLoading(false));
         Router.events.off('routeChangeError', () => setIsLoading(false));
      };
   }, [Router.events]);

   return isLoading;
};