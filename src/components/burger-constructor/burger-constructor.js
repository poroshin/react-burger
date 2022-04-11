import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import PropTypes from 'prop-types';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';

import { ConstructorIngredient } from '../constructor-ingredient/constructor-ingredient';
import { labels } from '../../utils/constants';
import { setBunSelectedIngredients, addItemSelectedIngredients } from '../../services/actions/selectedIngredients';
import { increaseIngredientCount, setBunCount, deleteBunCount } from '../../services/actions/ingredients';
import { setTotalPrice, deleteTotalPrice } from '../../services/actions/order';

import style from './burger-constructor.module.css';

const BurgerConstructor = ({onOpenModalOrder}) => {
  const dispatch = useDispatch();
  const selectedBun = useSelector(state => state.selectedIngredients.bun);
  const selectedIngredients = useSelector(state => state.selectedIngredients.data);
  const totalPrice = useSelector(state => state.order.totalPrice);

	const [, dropRef] = useDrop({
		accept: 'ingredient',
		drop(item) {
      if(item.type === labels.bun){
        dispatch(setBunSelectedIngredients(item));
        dispatch(deleteBunCount());
        dispatch(setBunCount(item));
      }else{
        item.uuid = uuidv4();
        dispatch(addItemSelectedIngredients(item, uuidv4()));
        dispatch(increaseIngredientCount(item));
      }
		}
	});
  
  useEffect(() => {
    dispatch(deleteTotalPrice());
    if(selectedBun){
      dispatch(setTotalPrice(selectedBun.price * 2));
    }
    if(selectedIngredients){
      selectedIngredients.map((item, index) => {
        dispatch(setTotalPrice(item.price));
      });
    }
  }, [selectedBun, selectedIngredients]);

  return (
    <section className={`${style.section} pt-25 pl-5 pb-30`} ref={dropRef}>
      <div className={`${style.elements} pb-4`}>
        {selectedBun && 
        <div className={`${style.constructor__element} pl-10 pr-1`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={selectedBun.name + ' (верх)'}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        </div>
        }
        {selectedIngredients && 
        <ul className={style.ingredients}>
          {selectedIngredients.map(item => (
            <ConstructorIngredient key={item.uuid} ingredient={item} />
          ))}
        </ul>
        }
        {selectedBun && 
        <div className={`${style.constructor__element} pl-10 pr-1`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={selectedBun.name + ' (низ)'}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        </div>
        }
      </div>
      <div className={style.checkout}>
        <div className={`${style.price} pr-10`}>
          <p className="text text_type_digits-medium pr-2">{totalPrice}</p>
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
  onOpenModalOrder: PropTypes.func.isRequired,
};

export default BurgerConstructor;
