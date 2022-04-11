import React from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { labels } from '../../utils/constants';
import { menuItemPropTypes } from '../../utils/types';
import { dataFilter } from '../../utils/filter';

import style from './burger-ingredients.module.css';

const Ingredient = ({ingredient, isOpenModal}) => {
	const [, dragRef] = useDrag({
		type: "ingredient",
		item: ingredient
	});

  return (
    <li ref={dragRef} className={style.item} onClick={() => isOpenModal(ingredient)}>
      <div className={`${style.item} pt-4 pr-3 pb-4 pl-3`}>
        {ingredient.count>0 && <Counter count={ingredient.count} size="default" />}
        <img src={ingredient.image} alt={ingredient.name} className='pl-4 pr-4'></img>
        <div className={`${style.price} pt-1 pb-1`}>
          <p className='text text_type_main-default pr-2'>{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${style.item__p} text text_type_main-small`}>{ingredient.name}</p>
      </div>
    </li>
  )
};

const BurgerIngredients = ({onOpenModalIngredient}) => {
  const dataState = useSelector(state => state.ingredients);
  
  const [currentTab, setCurrentTab] = React.useState(labels.bun);

  const ingredientsElement = document.getElementById(labels.ingredients);
  const sauceElement = document.getElementById(labels.sauce);
  const mainElement = document.getElementById(labels.main);
  const onScrollIngredients = () => {
    if(ingredientsElement && sauceElement && mainElement){
      const tabIngredientsElement = ingredientsElement.getBoundingClientRect().top;
      const sauceBun = tabIngredientsElement - sauceElement.getBoundingClientRect().top;
      const mainBun = tabIngredientsElement - mainElement.getBoundingClientRect().top;
      mainBun >= 0 
        ? setCurrentTab(labels.main) 
        : sauceBun >= 0 
          ? setCurrentTab(labels.sauce)
          : setCurrentTab(labels.bun);
    }
  }

  const scrollToTab = (tab) => {
    setCurrentTab(tab);
    // document.getElementById(tab).scrollIntoView({ behavior: "smooth" }); // todo optionaly
  }

  return (
    <section className={`${style.section} pt-5 pr-5 pb-30`}>
      <h1 className='text text_type_main-large pt-5 pb-5'>
        Соберите бургер
      </h1>
      <div className={`${style.tab} pb-5`}>
        <Tab value="bun" active={currentTab === labels.bun} onClick={scrollToTab}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === labels.sauce} onClick={scrollToTab}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === labels.main} onClick={scrollToTab}>
          Начинки
        </Tab>
      </div>
      {dataState.isLoaded &&
      <div className={`${style.scrollBar} pr-1`} id={labels.ingredients} onScroll={onScrollIngredients}>
        <h2 className='text text_type_main-medium pt-5 pb-2' id={labels.bun}>
          Булки
        </h2>
        <ul className={style.array}>
          {dataFilter(dataState.data, labels.bun).map((item, index) => (
            <Ingredient key={item._id} ingredient={item} isOpenModal={onOpenModalIngredient} />
          ))}
        </ul>
        <h2 className='text text_type_main-medium pt-5 pb-2' id={labels.sauce}>
          Соусы
        </h2>
        <ul className={style.array}>
          {dataFilter(dataState.data, labels.sauce).map((item, index) => (
            <Ingredient key={item._id} ingredient={item} isOpenModal={onOpenModalIngredient} />
          ))}
        </ul>
        <h2 className='text text_type_main-medium pt-5 pb-2' id={labels.main}>
          Начинка
        </h2>
        <ul className={style.array}>
          {dataFilter(dataState.data, labels.main).map((item, index) => (
            <Ingredient key={item._id} ingredient={item} isOpenModal={onOpenModalIngredient} />
          ))}
        </ul>
      </div>
      }
    </section>
  );
}
BurgerIngredients.propTypes = {
  onOpenModalIngredient: PropTypes.func.isRequired,
};
Ingredient.propTypes = {
  ingredient: menuItemPropTypes.isRequired,
  isOpenModal: PropTypes.func.isRequired,
};
Counter.propTypes = {
  count: PropTypes.number,
};

export default BurgerIngredients;
