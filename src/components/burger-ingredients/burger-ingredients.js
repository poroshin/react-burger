import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredients } from '../../utils/constants';
import { menuItemPropTypes } from '../../utils/types';
import { dataFilter } from '../../utils/filter';
import { DataIngredientsContext } from '../../utils/context';

import style from './burger-ingredients.module.css';

const Ingredient = ({ingredient, count, isOpenModal}) => (
  <li className={style.item} onClick={() => isOpenModal(ingredient)}>
    <div className={`${style.item} pt-4 pr-3 pb-4 pl-3`}>
      <Counter count={count} size="default" />
      <img src={ingredient.image} alt={ingredient.name} className='pl-4 pr-4'></img>
      <div className={`${style.price} pt-1 pb-1`}>
        <p className='text text_type_main-default pr-2'>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${style.item__p} text text_type_main-small`}>{ingredient.name}</p>
    </div>
  </li>
);

const BurgerIngredients = ({onOpenModalIngredient}) => {
  
  const { dataState } = useContext(DataIngredientsContext);
  const textCount = 1;
  const [current, setCurrent] = React.useState(ingredients.bun);

  return (
    <section className={`${style.section} pt-5 pr-5 pb-30`}>
      <h1 className='text text_type_main-large pt-5 pb-5'>
        Соберите бургер
      </h1>
      <div className={`${style.tab} pb-5`}>
        <Tab value="bun" active={current === ingredients.bun} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === ingredients.bun} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === ingredients.bun} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      {dataState.isLoaded &&
      <div className={`${style.scrollBar} pr-1`}>
        <h2 className='text text_type_main-medium pt-5 pb-2'>
          Булки
        </h2>
        <ul className={style.array}>
          {dataFilter(dataState.data, ingredients.bun).map((item, index) => (
            <Ingredient key={item._id} count={textCount} ingredient={item} isOpenModal={onOpenModalIngredient} />
          ))}
        </ul>
        <h2 className='text text_type_main-medium pt-5 pb-2'>
          Соусы
        </h2>
        <ul className={style.array}>
          {dataFilter(dataState.data, ingredients.sauce).map((item, index) => (
            <Ingredient key={item._id} count={textCount} ingredient={item} isOpenModal={onOpenModalIngredient} />
          ))}
        </ul>
        <h2 className='text text_type_main-medium pt-5 pb-2'>
          Начинка
        </h2>
        <ul className={style.array}>
          {dataFilter(dataState.data, ingredients.main).map((item, index) => (
            <Ingredient key={item._id} count={textCount} ingredient={item} isOpenModal={onOpenModalIngredient} />
          ))}
        </ul>
      </div>
      }
    </section>
  );
}
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(menuItemPropTypes.isRequired),
  onOpenModalIngredient: PropTypes.func.isRequired,
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
