import React, { useEffect, useState, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, ADD, REMOVE } from '../redux/actions/action';

const CardsDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();
  const getdata = useSelector((state) => state.cartreducer.carts);

  // Memoized compare function
  const compare = useCallback(() => {
    const comparedata = getdata.filter((e) => e.id === Number(id)); // Convert id to number
    setData(comparedata);
  }, [getdata, id]);

  // Add data to the cart
  const send = (e) => {
    dispatch(ADD(e));
  };

  // Delete item from cart
  const dlt = (id) => {
    dispatch(DLT(id));
    history('/');
  };

  // Remove one item from the cart
  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  useEffect(() => {
    compare(); // Call memoized compare function
  }, [compare]);

  if (data.length === 0) {
    return <h3 className="text-center">No details found for this item</h3>;
  }

  // Function to handle quantity change
  const handleQuantityChange = (item, action) => {
    if (action === 'decrease') {
      item.qnty <= 1 ? dlt(item.id) : remove(item);
    } else if (action === 'increase') {
      send(item);
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
