import React from 'react';
import PropTypes from 'prop-types';
import style from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { menuItemPropTypes } from '../../utils/constants';

const Ingredient = ({ingredient, count, isOpenModal}) => (
  <li className={style.item} onClick={() => isOpenModal(ingredient)}>
    <div className={style.itemDiv + ' pt-4 pr-3 pb-4 pl-3'}>
      <Counter count={count} size="default" />
      <img src={ingredient.image} alt={ingredient.name} className='pl-4 pr-4'></img>
      <div className={style.price + ' pt-1 pb-1'}>
        <p className="text text_type_main-default pr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={style.itemText + " text text_type_main-small"}>{ingredient.name}</p>
    </div>
  </li>
);

const BurgerIngredients = ({data, isLoaded, onOpenModalIngredient}) => {
  const dataBun = [];
  const dataMain = [];
  const dataSauce = [];
  data.forEach(function(i) {
    if(i.type === 'bun') dataBun.push(i);
    if(i.type === 'main') dataMain.push(i);
    if(i.type === 'sauce') dataSauce.push(i);
  });
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
      {isLoaded &&
      <div className={style.scrollBar + ' pr-1'}>
        <h2 className='text text_type_main-medium pt-5 pb-2'>
          Булки
        </h2>
        <ul className={style.array}>
          {dataBun.map((item, index) => (
            <Ingredient key={item._id} count={item.__v} ingredient={item} isOpenModal={onOpenModalIngredient} />
          ))}
        </ul>
        <h2 className='text text_type_main-medium pt-5 pb-2'>
          Соусы
        </h2>
        <ul className={style.array}>
          {dataSauce.map((item, index) => (
            <Ingredient key={item._id} count={item.__v} ingredient={item} isOpenModal={onOpenModalIngredient} />
          ))}
        </ul>
        <h2 className='text text_type_main-medium pt-5 pb-2'>
          Начинка
        </h2>
        <ul className={style.array}>
          {dataMain.map((item, index) => (
            <Ingredient key={item._id} count={item.__v} ingredient={item} isOpenModal={onOpenModalIngredient} />
          ))}
        </ul>
      </div>
      }
    </section>
  );
}
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(menuItemPropTypes.isRequired),
};
Ingredient.propTypes = {
  ingredient: menuItemPropTypes.isRequired,
  count: PropTypes.number,
  isOpenModal: PropTypes.func.isRequired,
};
Counter.propTypes = {
  count: PropTypes.number,
};

export default BurgerIngredients;
