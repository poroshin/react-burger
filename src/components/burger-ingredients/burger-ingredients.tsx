import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from "react-dnd";
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector } from '../../services/hooks';
import { TIngredient } from '../../services/types';
import { labels } from '../../utils/constants';
import { dataFilter } from '../../utils/filter';

import style from './burger-ingredients.module.css';

type TIngredientItem = {
  ingredient: TIngredient;
  isOpenModal?: (arg0: TIngredient) => void;
}

type TBurgerIngredients = {
  onOpenModalIngredient: () => void;
}

const Ingredient: FC<TIngredientItem> = ({ingredient}) => {
  const location = useLocation();

	const [, dragRef] = useDrag({
		type: "ingredient",
		item: ingredient
	});

  return (
    <li ref={dragRef} className={style.item}>
      <Link
        className={style.link}
        to={{
          pathname: `/ingredients/${ingredient._id}`,
          state: { background: location },
        }}
      >
        <div className={`${style.item} pt-4 pr-3 pb-4 pl-3`}>
          {ingredient?.count ? ingredient?.count>0 && <Counter count={ingredient.count} size="default" /> : null}
          <img src={ingredient.image} alt={ingredient.name} className='pl-4 pr-4'></img>
          <div className={`${style.price} pt-1 pb-1`}>
            <p className='text text_type_main-default pr-2'>{ingredient.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`${style.item__p} text text_type_main-small`}>{ingredient.name}</p>
        </div>
      </Link>
    </li>
  )
};

const BurgerIngredients = () => {
  const dataState = useSelector(state => state.ingredientsReducer);
  
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

  const scrollToTab = (tab: React.SetStateAction<string>) => {
    setCurrentTab(tab);
    // document.getElementById(tab).scrollIntoView({ behavior: "smooth" }); // todo optionaly
  }

  return (
    <section className={`${style.section} pt-5 pr-5`}>
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
          {dataFilter(dataState.data, labels.bun).map((item: TIngredient, index: number) => (
            <Ingredient key={item._id} ingredient={item} />
          ))}
        </ul>
        <h2 className='text text_type_main-medium pt-5 pb-2' id={labels.sauce}>
          Соусы
        </h2>
        <ul className={style.array}>
          {dataFilter(dataState.data, labels.sauce).map((item: TIngredient, index: number) => (
            <Ingredient key={item._id} ingredient={item} />
          ))}
        </ul>
        <h2 className='text text_type_main-medium pt-5 pb-2' id={labels.main}>
          Начинка
        </h2>
        <ul className={style.array}>
          {dataFilter(dataState.data, labels.main).map((item: TIngredient, index: number) => (
            <Ingredient key={item._id} ingredient={item} />
          ))}
        </ul>
      </div>
      }
    </section>
  );
}

export default BurgerIngredients;
