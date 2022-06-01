
import { Button } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../styles/Admin.module.css"

const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];
  const handleDelete =async(id,category,)=>{

    try {
      const res = await axios.delete("http://localhost:3000/api/"+category+"/"+id);
      switch (category) {
        case "products":
          setPizzaList(pizzaList.filter((pizza)=>pizza._id!==id));
          break;
        case "orders":
          setOrderList(orderList.filter((order)=>order._id!==id));
        default:
          break;
      }
      
    } catch (error) {
      console.log(error);
    }
  }    

const handleStatus= async(id)=>{
  const item = orderList.filter((order) => order._id=== id)[0];
  console.log(item);
  const currentStatus = item.status;
  try {
    const res = await axios.put("http://localhost:3000/api/orders/"+id,{
      status:currentStatus +1,
    });
    setOrderList([
      res.data,
      ...orderList.filter((order)=>order._id!==id)
    ]);
  } catch (err) {
    console.log(err);
  }
}
  

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <img
                    src={product.image}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.price[0]}</td>
                <td>
                  <Button className={styles.button}>Edit</Button>
                  <Button onClick={()=>handleDelete(product._id, "products")}
                    className={styles.button}>
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order,index) => (
            <tbody key={index}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <Button className={styles.button} onClick={()=>handleStatus(order._id)} >
                    Next Stage
                  </Button>
                  <Button className={styles.button} onClick={()=>handleDelete(order._id,"orders")}>Delete</Button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
   const mycookie = ctx.req?.cookies ||"";
   if(mycookie.token!== process.env.TOKEN)
   {
     return{
       redirect:{
          destination:"/admin/login",
          permanent: false,
       },

     };
   }
  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;