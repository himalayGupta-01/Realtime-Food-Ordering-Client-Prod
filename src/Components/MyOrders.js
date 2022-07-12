import React, { useEffect, useState } from 'react'
import { FaSyncAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux"
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { getOrderById } from '../actions/Order.actions';
import { Redirect, useLocation } from "react-router-dom";
import { generatePublicUrl } from "../urlConfig";
import NewModal from './NewModal';
import { socket } from './socketIo';

// import { io } from "socket.io-client";


const MyOrders = (props) => {

    // const socket = useRef();

    const order = useSelector(state => state.order)
    const auth = useSelector(state => state.auth)
    const [currentOrder, setCurrentOrder] = useState({})
    const [showDetails, setShowDetails] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(location)
        // socket.current = io("http://localhost:8000")

        // socket.current.on("connection", () => {
        //     console.log("connected to server")
        // })  

        //emit join event to socket using id as getUpdatedOrder
        socket.emit("join", "getUpdatedOrder");

        //if an event of type "orderUpdated" emits then do what
        socket.on("orderUpdated", (data) => {
            // console.log("DATA IS ",data)
            // console.log(auth.user.name)
            if (data === auth.user._id)
                dispatch(getOrderById(auth.user._id));
        })

        dispatch(getOrderById(auth.user._id));
        // return socket.disconnect()
        // return socket.current.disconnect()
    }, [auth.user._id, dispatch, auth])

    let location = useLocation()

    const getStatus = (status) => {
        let myWidth = "10%";
        let myColor = "#FCB711";

        if (status === "Order Confirmed") {
            myWidth = "25%";
            myColor = "#F37021"
        }
        if (status === "Being Cooked") {
            myWidth = "50%";
            myColor = "#6460AA"
        }
        else if (status === "Out For Delivery") {
            myWidth = "75%";
            myColor = "#0089D0";
        }
        else if (status === "Delivered") {
            myWidth = "100%";
            myColor = "#0DD14B";
        }
        if (status === "Order Cancelled") {
            myWidth = "100%";
            myColor = "#D50F25"
        }
        return <td style={{ width: "15%" }}>
            <div style={{ width: "100%", borderRadius: "30px", border: "1px solid black" }}>
                <div id="my" style={{ borderRadius: "30px", height: "10px", width: `${myWidth}`, backgroundColor: `${myColor}` }}> </div>
            </div>
            {status}
        </td>
    }

    const alertMsg = document.querySelector("#success-alert")
    if (alertMsg) {
        setTimeout(() => {
            alertMsg.remove();
        }, 3000);
    }

    const handleShowOrderDetails = (order) => {
        setCurrentOrder(order);
        setShowDetails(true);
    }

    const renderCart = () => {

        let totalCart = []

        Object.entries(currentOrder.items.items).forEach(item =>
            Object.entries(item[1]).forEach(itemValue => {
                if (itemValue[0] === "item") {
                    totalCart.push({
                        item: {
                            ...itemValue[1]
                        },
                        quantity: item[1].qty
                    })
                }
            })
        )

        return (<>
            {totalCart.map(val =>
                <div key={val._id} className=" flex items-center my-8 justify-between">
                    <div className="flex items-center">
                        <img className="w-24" src={generatePublicUrl(val.item.productPicture)} alt="" />
                        <div className="flex-1 ml-4" >
                            <h1>{val.item.name}</h1>
                            <span>MEDIUM</span>
                        </div>
                    </div>
                    <span className="add-minus-quantity"
                    >
                        <input type="text" value={val.quantity} />
                    </span>
                    <div className="font-bold text-lg">₹{val.item.price}</div>
                    <div className="font-bold text-lg">₹{(Number(val.item.price) * Number(val.quantity))}</div>
                </div>
            )}

        </>)

    }

    const renderOrderDetails = () => {
        return (
            <NewModal
                size="lg"
                show={showDetails}
                handleClose={() => setShowDetails(false)}
                modelTitle={"Order Summary"}
            >
                <Row>
                    <Col>
                        <div className=" order container mx-auto w-1/2">
                            <div className="flex items-center border-b border-gray-300 pb-4">
                                <h1 className=" font-bold ml-4 text-2xl">Order Summary</h1>
                            </div>
                            <div className="order-list">
                                {renderCart()}
                            </div>
                            <hr />
                            <div className="text-right py-5">
                                <div>
                                    <span className="text-lg font-bold">Total Amount:</span>
                                    <span className="amount text-2xl font-bold ml-2">₹{currentOrder.items.totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </NewModal>

        )
    }


    if (!(auth.authenticate)) {
        return <Redirect to="/" />
    }


    return (
        <>
            <section className="orders light-section">
                <div className="container mx-auto pt-12">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h1 className="font-bold text-lg mb-4">All orders</h1>
                        <button className="nav-link-blue px-4 py-2 rounded-full flex items-center " onClick={() => { dispatch(getOrderById(auth.user._id)) }} ><FaSyncAlt /></button>
                    </div>
                    {location.state && location.state.from === "cart" ? <div id="success-alert" className="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3"
                        role="alert">
                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path
                                d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                        </svg>
                        <p>Order Placed Successfully</p>
                    </div>

                        : null
                    }
                    <Container>
                        <Row>
                            <Col>
                                <Table style={{ fontSize: "16px", width: "100%" }} responsive="sm">
                                    <thead>
                                        <tr>
                                            {/* <th>S. No.</th> */}
                                            <th>Order Date</th>
                                            <th>Order Time</th>

                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Payment Mode</th>
                                            <th>Status</th>
                                            <th>Updated At</th>
                                            <th style={{ textAlign: "center" }}>View Items</th>

                                        </tr>
                                    </thead>
                                    <tbody style={{ textAlign: "center" }}>
                                        {
                                            order.orders.length > 0 ?
                                                order.orders.map((order, index) => <tr
                                                    key={order._id}
                                                    style={{
                                                        // marginBottom: "20px",
                                                        backgroundColor: order.status === "Order Cancelled" ? "#e8090999" : order.status === "Delivered" ? "#69db7d" : "inherit",
                                                        // textDecoration: order.status === "Order Cancelled" ? "line-through" : "none",
                                                        // textDecorationThickness: order.status === "Order Cancelled" ? "10%" : "auto",
                                                    }}
                                                >
                                                    <td>{`${new Date((order.createdAt).toString()).toLocaleDateString().split("/")[1]}/${new Date("2022-05-02T00:57:04.231Z").toLocaleDateString().split("/")[0]}/${new Date("2022-05-02T00:57:04.231Z").toLocaleDateString().split("/")[2]}`}</td>
                                                    <td>{new Date((order.createdAt).toString()).toLocaleTimeString()}</td>

                                                    <td>{order.phone}</td>
                                                    <td>{order.address}</td>
                                                    <td>{order.paymentType}</td>
                                                    {getStatus(order.status)}
                                                    <td>{new Date((order.updatedAt).toString()).toLocaleTimeString()}</td>


                                                    <td style={{
                                                        display: "flex",
                                                        justifyContent: "space-around",
                                                    }}>
                                                        <Button variant="outline-primary" onClick={() => {
                                                            handleShowOrderDetails(order)
                                                        }}>Details</Button>
                                                    </td>
                                                </tr>
                                                )
                                                :
                                                null
                                        }
                                    </tbody>
                                </Table>

                            </Col>
                        </Row>
                    </Container>
                </div>
                {showDetails ? renderOrderDetails() : null}
            </section>


        </>
    )
}

export default MyOrders