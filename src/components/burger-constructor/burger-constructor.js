import React from 'react';
import PropTypes from 'prop-types';
import style from './burger-constructor.module.css';
import { data } from '../../utils/data';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients() {
  const dataBun = [];
  const dataMain = [];
  const dataSauce = [];
  data.forEach(function(i) {
    if(i.type === 'bun') dataBun.push(i);
    if(i.type === 'main') dataMain.push(i);
    if(i.type === 'sauce') dataSauce.push(i);
  });
  return (
    <section className={style.section + ' pt-25 pl-5'}>
      <div className={style.elements + ' pb-4'}>
        <div className={style.constructorElement}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={dataBun[0].name + ' (верх)'}
            price={dataBun[0].price}
            thumbnail={dataBun[0].image}
          />
        </div>
        <div className={style.drug + ' pl-5'}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={dataSauce[2].name}
            price={dataSauce[2].price}
            thumbnail={dataSauce[2].image}
          />
        </div>
        <div className={style.drug + ' pl-5'}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={dataMain[0].name}
            price={dataMain[0].price}
            thumbnail={dataMain[0].image}
          />
        </div>
        <div className={style.drug + ' pl-5'}>
            <DragIcon type="primary" />
          <ConstructorElement
            text={dataSauce[0].name}
            price={dataSauce[0].price}
            thumbnail={dataSauce[0].image}
          />
        </div>
        <div className={style.constructorElement}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={dataBun[0].name + ' (низ)'}
            price={dataBun[0].price}
            thumbnail={dataBun[0].image}
          />
        </div>
      </div>
      <div className={style.checkout}>
        <div className={style.price + ' pr-10'}>
          <p className="text text_type_digits-medium pr-2">6150</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
ConstructorElement.propTypes = {
  isLocked: PropTypes.bool,
  text: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
}; 

export default BurgerIngredients;
