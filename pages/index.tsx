import { Button } from '../components/Button/Button';
import { Htag } from '../components/HTag/Htag';
import { P } from '../components/P/P';
import { Section } from '../components/Section/Section';
import { MainSlider } from '../components/sliders/MainSlider/MainSlider';
import { withLayout } from '../layout/Layout';
import s from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={s.body}>
      <div className={s.mainSlider}>
        <MainSlider/>
      </div>
      <Section 
        img='https://via.placeholder.com/1000'
        btnText='Products BUY'
        title='Some title'
        text='Lorem ipsum dolor sit amet consectetur adipisicing elit. At, eaque!'
        onBtnClick={() => alert('Click')}
      />
      <Section 
        img='https://via.placeholder.com/1000'
        btnText='Products BUY'
        title='Some title'
        text='Lorem ipsum dolor sit amet consectetur adipisicing elit. At, eaque!'
        onBtnClick={() => alert('Click')}
        reversed
      />
      <Section 
        img='https://via.placeholder.com/1000'
        btnText='Products BUY'
        title='Some title'
        text='Lorem ipsum dolor sit amet consectetur adipisicing elit. At, eaque!'
        onBtnClick={() => alert('Click')}
      />
      <Section 
        img='https://via.placeholder.com/1000'
        btnText='Products BUY'
        title='Some title'
        text='Lorem ipsum dolor sit amet consectetur adipisicing elit. At, eaque!'
        onBtnClick={() => alert('Click')}
        reversed
      />
    </div>
  );
};

export default withLayout(Home);