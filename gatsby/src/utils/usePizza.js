import { useContext, useState } from 'react';

import OrderContext from '../components/OrderContext';
import calculateOrderTotal from './calculateOrderTotal';
import attachNamesAndPrices from './attachNamesAndPrices';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
  const [order, setOrder] = useContext(OrderContext);

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessgae] = useState('');

  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }

  // when someone submits the form
  async function submitOrder(e) {
    e.preventDefault();
    console.log(e);
    setLoading(true);
    setError(null);
    setMessgae(null);

    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    };
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const text = JSON.parse(await res.text());

    //  check if worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn of loading
      setError(text.message);
    } else {
      // it worked
      setLoading(false);
      setMessgae('Success!');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
