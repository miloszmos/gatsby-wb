import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  return order.reduce((acc, singleOrder) => {
    const pizza = pizzas.find((p) => p.id === singleOrder.id);
    return acc + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
}
