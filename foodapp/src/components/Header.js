import React, { useEffect, useState, useMemo } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/esm/Table';
import { DLT } from '../redux/actions/action';
import { toast } from 'react-toastify';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const getdata = useSelector((state) => state.cartreducer.carts);
    const dispatch = useDispatch();

    // Calculate total using useMemo for performance optimization
    const total = useMemo(() => {
        return getdata.reduce((acc, item) => acc + item.price * item.qnty, 0);
    }, [getdata]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt = (id) => {
        dispatch(DLT(id));
        toast.error(`Item removed from the cart!`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
    };

    const totalQuantity = useMemo(() => {
    return getdata.reduce((acc, item) => acc + item.qnty, 0); // Summing the quantity of each item
}, [getdata]);

    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light mx-3">Add to Cart</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/" className="text-decoration-none text-light">Home</NavLink>
                    </Nav>

                    <Badge 
                    //badgeContent={getdata.length} 
                        badgeContent={totalQuantity}
                        color="primary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i className="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
                    </Badge>

                </Container>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        getdata.length ?
                            <div className="card_details w-96 p-2">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Restaurant Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getdata.map((e) => (
                                                <tr key={e.id}>
                                                    <td>
                                                        <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                                            <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt="" />
                                                        </NavLink>
                                                    </td>
                                                    <td>
                                                        <p>{e.rname}</p>
                                                        <p>Price: ₹{e.price}</p>
                                                        <p>Quantity: {e.qnty}</p>
                                                        <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                                                            <i className='fas fa-trash smalltrash' aria-label="Remove item"></i>
                                                        </p>
                                                    </td>
                                                    <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                                                        <i className='fas fa-trash largetrash' aria-label="Remove item"></i>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        <p className="text-center">Total: ₹{total}</p>
                                    </tbody>
                                </Table>
                            </div> :
                            <div className='card_details d-flex justify-content-center align-items-center w-96 p-2 relative'>
                                <i className='fas fa-close smallclose'
                                    onClick={handleClose}
                                    style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
                                <p style={{ fontSize: 22 }}>Your cart is empty</p>
                                <img src="/cart.gif" alt="cart img" className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
                            </div>
                    }
                </Menu>
            </Navbar>
        </>
    );
};

export default Header;
