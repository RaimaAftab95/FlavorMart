import React, { useEffect, useState, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, ADD, REMOVE, UPDATE_QTY } from '../redux/actions/action';
import Cardsdata from './CardsData'; // Import your cards data
import { toast } from 'react-toastify';

const CardsDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();
  const getdata = useSelector((state) => state.cartreducer.carts); // Get data from Redux store

  // Memoized compare function to fetch details for the selected item
  const compare = useCallback(() => {
    // Find the card details by comparing the id
    const itemDetails = Cardsdata.find((item) => item.id === Number(id)); // Find in CardsData
    if (itemDetails) {
      const itemInCart = getdata.find((e) => e.id === Number(id)); // Check if it's in the cart
      if (itemInCart) {
        // If item is in cart, update with quantity
        itemDetails.qnty = itemInCart.qnty;
      } else {
        // If not in cart, set default quantity as 0 or 1
        itemDetails.qnty = 1;
      }
      setData([itemDetails]); // Set the item details in state
    }
  }, [getdata, id]);

  // Add data to the cart
  const send = (e) => {
    dispatch(ADD(e)); // Dispatch action to add item to cart
    toast.success(`${e.rname} added to the cart!`);
  };

  // Delete item from cart
  const dlt = (id) => {
    dispatch(DLT(id));
    toast.error(`Item removed from the cart!`);
    history('/'); // Navigate back to the main page after deletion
  };

  // Remove one item from the cart
  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  useEffect(() => {
    compare(); // Call memoized compare function
  }, [compare]);

  // If no item is found, show a message
  if (data.length === 0) {
    return <h3 className="text-center">No details found for this item</h3>;
  }

  // Function to handle quantity change
const handleQuantityChange = (item, action) => {
  const MIN_QUANTITY = 1; 
  const MAX_QUANTITY = 10;
  let updatedItem = { ...item }; // Clone item to update

  if (action === 'decrease') {
    if (updatedItem.qnty <= MIN_QUANTITY) {
      toast.info(`You can't have less than ${MIN_QUANTITY} item${MIN_QUANTITY > 1 ? 's' : ''} in the cart!`);
      return;
    } else {
      updatedItem.qnty -= 1;
      dispatch(UPDATE_QTY(updatedItem.id, updatedItem.qnty));
      toast.error('Item quantity decreased!');
    }
  } else if (action === 'increase') {
    if (updatedItem.qnty >= MAX_QUANTITY) {
      toast.warning(`You can't add more than ${MAX_QUANTITY} items!`);
      return;
    }
    updatedItem.qnty += 1;
    dispatch(ADD(updatedItem));
    toast.info('Item quantity increased!');
  }
};

  return (
    <div className="container mt-2">
      <h2 className="text-center">Item Details Page</h2>
      <section className="container mt-3">
        <div className="itemsdetails">
          {data.map((ele) => (
            <div key={ele.id}>
              <div className="items_img">
                <img src={ele.imgdata} alt={ele.rname} />
              </div>
              <div className="details">
                <Table>
                  <tbody>
                    <tr>
                      <td>
                        <p>
                          <strong>Restaurant</strong>: {ele.rname}
                        </p>
                        <p>
                          <strong>Price</strong>: ₹{ele.price}
                        </p>
                        <p>
                          <strong>Dishes</strong>: {ele.address}
                        </p>
                        <p>
                          <strong>Total</strong>: ₹{ele.price * ele.qnty}
                        </p>
                        <div
                          className="mt-5 d-flex justify-content-between align-items-center"
                          style={{
                            width: 100,
                            cursor: 'pointer',
                            background: '#ddd',
                            color: '#111',
                          }}
                        >
                          <span
                            style={{ fontSize: 24 }}
                            onClick={() => handleQuantityChange(ele, 'decrease')}
                          >
                            -
                          </span>
                          <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                          <span
                            style={{ fontSize: 24 }}
                            onClick={() => handleQuantityChange(ele, 'increase')}
                          >
                            +
                          </span>
                        </div>
                      </td>
                      <td>
                        <p>
                          <strong>Rating:</strong>{' '}
                          <span
                            style={{
                              background: 'green',
                              color: '#fff',
                              padding: '2px 5px',
                              borderRadius: '5px',
                            }}
                          >
                            {ele.rating} ★
                          </span>
                        </p>
                        <p>
                          <strong>Order Review:</strong>{' '}
                          <span>{ele.somedata}</span>
                        </p>
                        <p>
                          <strong>Remove:</strong>
                          <span>
                            <i
                              className="fas fa-trash"
                              onClick={() => dlt(ele.id)}
                              style={{
                                color: 'red',
                                fontSize: 20,
                                cursor: 'pointer',
                              }}
                            ></i>
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CardsDetails;

