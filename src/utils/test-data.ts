import { 
  TIngredient,
  TOrderData,
  TDataProfile,
  TUserForm,
  TOrderFeed
} from '../services/types';

export const ingredientBun: TIngredient = {
  _id:"60666c42cc7b410027a1a9b1",
  name:"Краторная булка N-200i",
  type:"bun",
  proteins:80,
  fat:24,
  carbohydrates:53,
  calories:420,
  price:1255,
  image:"https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v:0,
  count:0,
  uuid: 'testBun'
}

export const ingredientMain: TIngredient = {
  _id:"60666c42cc7b410027a1a9b5",
  name:"Говяжий метеорит (отбивная)",
  type:"main",
  proteins:800,
  fat:800,
  carbohydrates:300,
  calories:2674,
  price:3000,
  image:"https://code.s3.yandex.net/react/code/meat-04.png",
  image_mobile:"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  image_large:"https://code.s3.yandex.net/react/code/meat-04-large.png",
  __v:0,
  count:0,
  uuid: 'asdf1'
}

export const ingredientMain2: TIngredient = {
  _id:"60666c42cc7b410027a1a9b6",
  name:"Говяжий метеорит (отбивная) 2",
  type:"main",
  proteins:800,
  fat:800,
  carbohydrates:300,
  calories:2674,
  price:3000,
  image:"https://code.s3.yandex.net/react/code/meat-04.png",
  image_mobile:"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  image_large:"https://code.s3.yandex.net/react/code/meat-04-large.png",
  __v:0,
  count:0,
  uuid: 'asdf2'
}

export const ingredientBunCount2: TIngredient = {
  _id:"60666c42cc7b410027a1a9b1",
  name:"Краторная булка N-200i",
  type:"bun",
  proteins:80,
  fat:24,
  carbohydrates:53,
  calories:420,
  price:1255,
  image:"https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v:0,
  count:2,
  uuid: 'testBun'
}

export const ingredientMainCount1: TIngredient = {
  _id:"60666c42cc7b410027a1a9b5",
  name:"Говяжий метеорит (отбивная)",
  type:"main",
  proteins:800,
  fat:800,
  carbohydrates:300,
  calories:2674,
  price:3000,
  image:"https://code.s3.yandex.net/react/code/meat-04.png",
  image_mobile:"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  image_large:"https://code.s3.yandex.net/react/code/meat-04-large.png",
  __v:0,
  count:1,
  uuid: 'asdf1'
}

export const order: TOrderData = {
  name: 'Название заказа',
  order: { number: 123}
}

export const profile: TDataProfile = {
  user: {
    name: 'name',
    email: 'email@email.email',
    password: 'password',
  },
  message: 'message'
}

export const user: TUserForm = {
  name: 'name',
  email: 'email@email.email',
  password: 'password',
}

export const feed: TOrderFeed = {
  orders: [{
    ingredients: ['60666c42cc7b410027a1a9b1', '60666c42cc7b410027a1a9b5'],
    _id: 'id',
    status: 'success',
    number: 18084,
    name: 'name',
    createdAt: "2022-06-18T19:08:51.807Z",
    updatedAt: "2022-06-18T19:08:52.337Z",
  }],
  total: 5,
  totalToday: 10,
}