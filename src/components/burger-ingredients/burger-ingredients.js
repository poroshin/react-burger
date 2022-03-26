import React from 'react';
import PropTypes from 'prop-types';
import style from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { menuItemPropTypes } from '../../utils/constants';

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

const BurgerIngredients = ({dataBun, dataMain, dataSauce}) => {
  const [current, setCurrent] = React.useState('one');
  return (
    <section className={style.section + ' pt-5 pr-5 pb-30'}>
      <h1 className='text text_type_main-large pt-5 pb-5'>
        Соберите бургер
      </h1>
      <div className={style.tab + ' pb-5'}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={style.scrollBar + ' pr-1'}>
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
      </div>
    </section>
  );
}
BurgerIngredients.propTypes = {
  dataBun: PropTypes.arrayOf(menuItemPropTypes.isRequired),
  dataMain: PropTypes.arrayOf(menuItemPropTypes.isRequired),
  dataSauce: PropTypes.arrayOf(menuItemPropTypes.isRequired),
};
Ingredient.propTypes = {
  count: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  img: PropTypes.string,
};
Counter.propTypes = {
  count: PropTypes.number,
};

export default BurgerIngredients;
