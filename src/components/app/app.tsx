import React from 'react';
import logo from '../../images/logo.svg';
import style from './app.module.css';
import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { data } from '../../utils/data';

function App() {
  const dataBun: { _id: string; name: string; type: string; proteins: number; fat: number; carbohydrates: number; calories: number; price: number; image: string; image_mobile: string; image_large: string; __v: number; }[] = [];
  const dataMain: { _id: string; name: string; type: string; proteins: number; fat: number; carbohydrates: number; calories: number; price: number; image: string; image_mobile: string; image_large: string; __v: number; }[] = [];
  const dataSauce: { _id: string; name: string; type: string; proteins: number; fat: number; carbohydrates: number; calories: number; price: number; image: string; image_mobile: string; image_large: string; __v: number; }[] = [];
  data.forEach(function(i) {
    if(i.type === 'bun') dataBun.push(i);
    if(i.type === 'main') dataMain.push(i);
    if(i.type === 'sauce') dataSauce.push(i);
  });
  return (
    <>
      <AppHeader />
      <main className={style.main}>
        <BurgerIngredients dataBun={dataBun} dataMain={dataMain} dataSauce={dataSauce} />
        <BurgerConstructor data={data} dataBun={dataBun} />
      </main>
    </>
  );
}

export default App;
