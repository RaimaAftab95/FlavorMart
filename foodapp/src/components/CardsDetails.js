import React, { useEffect, useState, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, ADD, REMOVE } from '../redux/actions/action';
import Cardsdata from './CardsData'; // Import your cards data

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
  };

  // Delete item from cart
  const dlt = (id) => {
    dispatch(DLT(id));
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
    if (action === 'decrease') {
      if (item.qnty <= 1) {
        // If quantity is 1, remove the item from the cart
        dlt(item.id);
      } else {
        // Decrease the quantity
        item.qnty -= 1;
        dispatch(REMOVE(item)); // Remove the item and update
        dispatch(ADD(item)); // Add it again with updated quantity
      }
    } else if (action === 'increase') {
      item.qnty += 1; // Increase the quantity
      dispatch(ADD(item)); // Add it again with updated quantity
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
