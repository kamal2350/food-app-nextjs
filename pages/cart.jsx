import { Button } from '@mui/material';
import styles from '../styles/Cart.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import {useRouter} from 'next/router';
import {resetProduct} from '../redux/cartSlice';
import axios from 'axios';

// This values are the props in the UI
const Cart = () => {
   
    const cart = useSelector((state)=>state.cart);
    const discount=cart.total>500?0.1*cart.total:10;
    const dispatcher = useDispatch();
    const amount = cart.total-discount;
    const currency = "USD";
    const style = {"layout":"vertical"};
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
        const router = useRouter();
        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);
    
        const createOrder = async(data)=>{
            try {
                console.log("i am here");
                const res =   await axios.post("http://localhost:3000/api/orders",data);
                console.log(res.data);
                
                res.status === 201 && router.push("/orders/"+ res.data._id);
                dispatcher(resetProduct());

                
            } catch (error) {
                console.log(error);
            }
        }
        
        return (<>
                { (showSpinner && isPending) && <div className="spinner" /> }
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (orderDetails) {
                            // Your code here after capture the order
                            const shippingDetails= orderDetails.purchase_units[0].shipping;
                            createOrder({
                                customer:shippingDetails.name.full_name,
                                address:shippingDetails.address.address_line_1,
                                total:cart.total,
                                method:1,
                            });
                            console.log(orderDetails);
                        });
                    }}
                />
            </>
        );
    }
    
    const dispatch = useDispatch();

    console.log(cart.products);
  
    return ( 
        <div className={styles.container}>
        <div className={styles.left}>
            <table className={styles.table}>
                {
                    cart.products.length===0? <h2>Cart is Empty</h2>:(
                  <tbody>

                    <tr className={styles.tr}>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Extras</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                  </tbody>
                    )
                }
                
                {
                    cart.products.map((product)=>(
                <tbody>

                    <tr className={styles.tr}>
                        <td>
                            <div className={styles.image}>
                                <img src={product.image} alt="" />
                            </div>
                        </td>
                        <td className={styles.name}>{product.title}</td>
                        {
                            product.extras.length===0?(
                                <td></td>
                            ):
                            (
                                   <td>
                                       {product.extras.map((extra)=>(
                                           <p key ={extra._id}>
                                               {extra.text}
                                           </p>
                                       ))}
                                   </td>
        
                            )
                                
                            
                        }
                        <td>{product.price}</td>
                        <td>{product.count}</td>
                        <td className={styles.total}>{product.price*product.count}</td>
                    </tr>
                </tbody>
                    ))
                }
                    
                
               
            </table>
        </div>
        {cart.products.length===0?<></>:(

            
            <div className={styles.right}>
            <div className={styles.checkout_summary}>
                <p className={styles.checkout_heading}>Cart Total</p>
                <div className={styles.checkout_text}>
                    <p>SubTotal: {cart.total}</p>
                    <p>Discount: {Math.floor(discount)}</p>
                    <p>Total: {Math.ceil(cart.total-discount)}</p>
                </div>
                <Button className={styles.checkout_btn}>Checkout Now</Button>
                <div style={{ maxWidth: "750px", minHeight: "200px" }}>
                <PayPalScriptProvider
                    options={{
                        "client-id": "AYl0RSfcBMxVT7CgOHTG7jphdGOIcI3u53ZYk_xYGCJ8IRmCgq4NQme_TABUPfzllwH2WZHUpJQIqLsD",
                        components: "buttons",
                        currency: "USD",    
                        // "disable-funding":"credit,card"
                    }}
                    >
                    <ButtonWrapper
                        currency={currency}
                        showSpinner={false}
                        />
                </PayPalScriptProvider>
            </div>
            </div>
        </div>
        )}
        
            
    </div>
       
     );
}
 
export default Cart;
