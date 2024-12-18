import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Cardsdata from './CardsData';
import './style.css';
import { useDispatch } from 'react-redux';
import { ADD } from '../redux/actions/action';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Cards = () => {
  const [data, setData] = useState(Cardsdata);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate function

  const send = (e) => {
    dispatch(ADD(e));
  };

  const goToDetails = (id) => {
    navigate(`/cart/${id}`); // Navigate to the details page
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center">Add to Cart Projects</h2>

      <div className="row d-flex justify-content-center align-items-center">
        {data.map((element, id) => {
          return (
            <Card
              style={{ width: '22rem', border: 'none' }}
              className="mx-2 mt-4 card_style"
              key={id}
            >
              <Card.Img
                variant="top"
                src={element.imgdata}
                style={{ height: '16rem' }}
                className="mt-3"
                onClick={() => goToDetails(element.id)} // Add navigation on image click
                style={{ cursor: 'pointer' }}
              />
              <Card.Body>
                <Card.Title>{element.rname}</Card.Title>
                <Card.Text>Price : ₹ {element.price}</Card.Text>
                <div className="button_div d-flex justify-content-center">
                  <Button
                    variant="primary"
                    onClick={() => send(element)}
                    className="col-lg-12"
                  >
                    Add to Cart
                  </Button>
                </div>
                <Button
                  variant="info"
                  className="mt-2 col-lg-12"
                  onClick={() => goToDetails(element.id)} // Add navigation on button click
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
