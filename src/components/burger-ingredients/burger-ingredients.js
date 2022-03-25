import React from 'react';
import PropTypes from 'prop-types';
import style from './burger-ingredients.module.css';
import { data } from '../../utils/data';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = ({count, name, price, img}) => (
  <li className={style.item}>
    <div className={style.itemDiv + ' pt-4 pr-3 pb-4 pl-3'}>
      <Counter count={count} size="default" />
      <img src={img} alt={name} className='pl-4 pr-4'></img>
      <div className={style.price + ' pt-1 pb-1'}>
        <p className="text text_type_main-default pr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={style.itemText + " text text_type_main-small"}>{name}</p>
    </div>
  </li>
);

function BurgerConstructor() {
  const [current, setCurrent] = React.useState('one');
  const dataBun = [];
  const dataMain = [];
  const dataSauce = [];
  data.forEach(function(i) {
    if(i.type === 'bun') dataBun.push(i);
    if(i.type === 'main') dataMain.push(i);
    if(i.type === 'sauce') dataSauce.push(i);
  });
  return (
    <section className={style.section + ' pt-5 pr-5'}>
      <h1 className='text text_type_main-large pt-5 pb-5'>
        Соберите бургер
      </h1>
      <div className={style.tab + ' pb-5'}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <h2 className='text text_type_main-medium pt-5 pb-2'>
        Булки
      </h2>
      <ul className={style.array}>
        {dataBun.map((item, index) => (
          <Ingredient key={item._id} count={item.__v} name={item.name} price={item.price} img={item.image} />
        ))}
      </ul>
      <h2 className='text text_type_main-medium pt-5 pb-2'>
        Соусы
      </h2>
      <ul className={style.array}>
        {dataSauce.map((item, index) => (
          <Ingredient key={item._id} count={item.__v} name={item.name} price={item.price} img={item.image} />
        ))}
      </ul>
      <h2 className='text text_type_main-medium pt-5 pb-2'>
        Начинка
      </h2>
      <ul className={style.array}>
        {dataMain.map((item, index) => (
          <Ingredient key={item._id} count={item.__v} name={item.name} price={item.price} img={item.image} />
        ))}
      </ul>
    </section>
  );
}
Ingredient.propTypes = {
  count: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  img: PropTypes.string,
}; 

export default BurgerConstructor;
