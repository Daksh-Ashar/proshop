import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate , Link} from "react-router-dom";
import Message from "../components/Message";
import Image from 'react-bootstrap/Image';
import bootstrapForm from 'react-bootstrap/Form';
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state)=> state.cart);
    const {cartItems} = cart;

    const addToCartHandler = async (product,qty) => {
        dispatch(addToCart({...product,qty}))
    }

    const removeToCartHandler = async (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }
    return (
        <Row>
            <Col md={8}>
                <h1 style={{marginBottom:'20px'}}>Shopping Cart</h1>
                {
                    cartItems.length == 0 ? (
                        <Message>
                            Your Cart is Empty <Link to="/">Go Back</Link>
                        </Message>
                    ) : 
                    (
                        <ListGroup variant="flush">
                            {cartItems.map((item)=> {
                               return <ListGroup.Item key={item._id}>
                                        <Row>
                                            <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col md={3}>
                                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>
                                                    ${item.price}
                                            </Col>
                                            <Col md={2}>
                                                <bootstrapForm.Select  value={item.qty} onChange={(e)=> {addToCartHandler(item,Number(e.target.value))}} size="sm">
                                                    {[...Array(item.countInStock).keys()].map((x)=> (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                   ))}
                                                </bootstrapForm.Select>
                                            </Col> 
                                            <Col md={2}>
                                                <Button type="button" variant="light" onClick={(e) => {removeToCartHandler(item._id)}}>
                                                        <FaTrash/>
                                                </Button>
                                            </Col>
                                        </Row>
                                </ListGroup.Item>
                            })}
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                     <ListGroup variant="flush">
                                <ListGroup.Item>
                                        <h2>
                                            SubTotal ({cartItems.reduce((acc,item) => {return acc + item.qty},0)}) items
                                        </h2>
                                        <h3>
                                            $ {
                                                cartItems.reduce((acc,item) => {return acc + item.qty * item.price},0).toFixed(2)
                                            }
                                        </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button type="button" className="btn btn-block" disabled={cartItems.length == 0} onClick={checkoutHandler}>
                                            Proceed to Checkout
                                    </Button>
                                </ListGroup.Item>
                     </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;