import { Button } from '@mui/material';
import styles from '../../styles/Orders.module.css'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import axios from 'axios';
const Orders = ({order}) => {
    const steps=['Paid','Preparing','On the way', 'Delivered'];
    
    return ( 
        <div className={styles.container}>
            <div className={styles.left}>
               
                <table className={styles.table}>
                        <tr className={styles.tr}>
                            <th>Order Id</th>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Total</th>
                            
                        </tr>
                        
                        <tr className={styles.tr}>
                            <td>{order._id}</td>
                            <td className={styles.name}>{order.customer}</td>
                            <td>{order.address}</td>
                            
                            <td className={styles.total}>{order.total}</td>
                        </tr>
                    </table>
                    <div className={styles.stepper}>
                        <Stepper activeStep={order.status+1} alternativeLabel>
                            {steps.map((label)=>(
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
            </div>
            <div className={styles.right}>
            <div className={styles.checkout_summary}>
                <p className={styles.checkout_heading}>Cart Total</p>
                <div className={styles.checkout_text}>
                    <p>SubTotal: 80</p>
                    <p>Discount: 10</p>
                    <p>Total: 70</p>
                </div>
                <Button className={styles.checkout_btn}>Paid</Button>
            </div>
        </div>        
        </div>
     );
}
 


export default Orders;

export  const getServerSideProps= async({params})=>{
    try {
        const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
        return{
            props:{
                order:res.data,
            }
        }
    } catch (error) {
        
    }
}