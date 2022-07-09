import { withLayout } from '../layout/Layout';
import s from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={s.body}>
       <h1>404 Not Found</h1>
    </div>
  );
};

export default withLayout(Home);