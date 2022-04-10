import React, { useContext, useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredients } from '../../utils/constants';
import { menuItemPropTypes } from '../../utils/types';
import { dataFilter, filterNotBun, randomData } from '../../utils/filter';
import { DataIngredientsContext, SelectedIngredientsContext } from '../../utils/context';

import style from './burger-constructor.module.css';

const totalPriceInitialState = { price: 0 }; 
function reducer(state, action) {
  switch (action.type) {
    case "setBun":
      return { price: state.price + action.price * 2 };
    case "add":
      return { price: state.price + action.price };
    case "remove":
      return { price: state.price - action.price };
    case "removeAll":
      return totalPriceInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const BurgerConstructor = ({onOpenModalOrder}) => {

  const { dataState } = useContext(DataIngredientsContext);
  const { selectedIngredients, setSelectedIngredients } = useContext(SelectedIngredientsContext);
  const [totalPriceState, totalPriceDispatcher] = useReducer(reducer, totalPriceInitialState, undefined);
  
  const [exampleBun, setExampleBun] = useState(null);
  const [exampleIngredients, setExampleIngredients] = useState(null);

  useEffect(() => {
    if(dataState.isLoaded){
      setExampleBun(dataFilter(dataState.data, ingredients.bun)[0]);
      setExampleIngredients(randomData(filterNotBun(dataState.data)));
    }
  }, [dataState]);

  useEffect(() => {
    if(exampleBun && exampleIngredients){
      const tempIngredientsArray = [];
      totalPriceDispatcher({type: 'setBun', price: exampleBun.price});
      tempIngredientsArray.push(exampleBun._id);
      exampleIngredients.map((item, index) => {
        totalPriceDispatcher({type: 'add', price: item.price});
        tempIngredientsArray.push(item._id);
      });
      tempIngredientsArray.push(exampleBun._id);

      setSelectedIngredients({ ingredients: tempIngredientsArray });
    }
    return () => {
      setSelectedIngredients({ ingredients: [] });
      totalPriceDispatcher({type: 'removeAll'});
    }
  }, [exampleBun, exampleIngredients]);

  return (
    <section className={`${style.section} pt-25 pl-5 pb-30`}>
      {dataState.isLoaded && exampleBun &&
      <div className={`${style.elements} pb-4`}>
        <div className={`${style.constructor__element} pl-10 pr-3`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={exampleBun.name + ' (верх)'}
            price={exampleBun.price}
            thumbnail={exampleBun.image}
          />
        </div>
        <ul className={style.ingredients}>
          {exampleIngredients.map((item, index) => (
            <li key={index} className={`${style.drug} pl-5 mr-1`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
            </li>
          ))}
        </ul>
        <div className={`${style.constructor__element} pl-10 pr-3`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={exampleBun.name + ' (низ)'}
            price={exampleBun.price}
            thumbnail={exampleBun.image}
          />
        </div>
      </div>
      }
      <div className={style.checkout}>
        <div className={`${style.price} pr-10`}>
          <p className="text text_type_digits-medium pr-2">{totalPriceState.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={onOpenModalOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(menuItemPropTypes.isRequired),
  onOpenModalOrder: PropTypes.func.isRequired,
};
ConstructorElement.propTypes = {
  isLocked: PropTypes.bool,
  text: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
};

export default BurgerConstructor;
