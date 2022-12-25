import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

export default class MyDocument extends Document {

   static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps };
   }

   render() {
      return (
         <Html lang='ua'>
            <Head/>
            <body>
               <Main/>
               <div id='tooltip' />
               <NextScript/>
            </body>
         </Html>
      );
   }
}