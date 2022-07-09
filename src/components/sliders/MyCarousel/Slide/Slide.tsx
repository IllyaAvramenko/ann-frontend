import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   
}

export const Slide: FC<IProps> = ({ children }) => {
  return (
    <div
      className="page__main-container"
      style={{
        minWidth: '100%',
        maxWidth: '100%',
      }}
    >
      {children}
    </div>
  );
};