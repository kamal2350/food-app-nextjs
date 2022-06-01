import { AddCircle, RemoveCircle, ShoppingBag } from '@mui/icons-material';
import { Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import styles from '../../styles/Product.module.css'
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
const Product = ({pizza}) => {
    const[size,setSize]= useState(0);
    const [count,setCount]=useState(1);
    const [price,setPrice]= useState(pizza.price[0]);
    const [extras, setExtras]=useState([]);
    const dispatch = useDispatch();
    
    
    const handleChange=(e,price)=>{
        const checked = e.target.checked;
        if(checked)
        {
            changePrice(price.price);
            setExtras(prev=>[...prev,price]);
        }
        else{
            changePrice(-price.price);
            setExtras(extras.filter(extra=> extra._id !== price._id));
        }
    
    }
    console.log(extras); 
    // console.log(price.id);   

     const changePrice =(number)=>{
         setPrice(price+number);
     }
    const handleSize=(sizeIndex)=>{
        const difference = pizza.price[sizeIndex]-pizza.price[size];
       setSize(sizeIndex);
       changePrice(difference);
    }
    const handleCount=(param)=>{
        if(param==="add"&& count<5)
        {
            setCount(count+1);
        }
        else if(param==="remove" && count>1)
        {
            setCount(count-1);
        }
    }
    
    // const pizza=
    //     {
    //         id:1,
    //         img:'/images/img1.png',
    //         name:'Cheese Pizaa',
    //         price:[110, 190, 300],
    //         desc:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',

    //     };
       const handleClick=()=>
       {
            dispatch(addProduct({...pizza,extras,price,count}));
       }
    
    return ( 
        <>
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.img_container}>
                    <img src={pizza.image} alt ="image"></img>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.right_container}>
                    <p className={styles.title}>{pizza.title}</p>
                    <span className={styles.price}>₹<span>{price}</span></span>
                    <p className={styles.desc}>{pizza.desc}</p>
                    <p className={styles.title2}>Choose your Pizza Size</p>
                    <div className={styles.size_range}>
                        <div id='small' onClick={()=>handleSize(0)}><p>S</p></div>
                        <div  id ="medium" onClick={()=>handleSize(1)}><p>M</p></div>
                        <div  id="large"onClick={()=>handleSize(2)}><p>L</p></div>
                    </div>
                    <div className={styles.choose}>
                        <p className={styles.title2}>Choose your Ingredients</p>
                        <div className={styles.ingredients}>
                            {
                                pizza.extraOption.map((price)=>(
                                    <div className={styles.option} key ={price.text}>
                                        <input className={styles.checkbox} type="checkbox"
                                        id={price.text}
                                        name={price.text}
                                        onChange={(e)=>handleChange(e, price)}
                                        />
                                        <label htmlFor='double'>{price.text}</label>
                                    </div>

                                ))
                            }
                            
                        </div>
                    </div>
                    <div className={styles.finalbox}>
                        <div className={styles.countbox}>
                            <RemoveCircle onClick={()=>handleCount("remove")} className={styles.countbox_icons}/>
                            <div>{count}</div>
                            <AddCircle onClick={()=>handleCount("add")} className={styles.countbox_icons}/>
                        </div>
                        <Button className={styles.finalbox_btn} endIcon={<ShoppingBag/>} onClick={handleClick} >Add to cart</Button>
                    </div>
                </div>    
            </div>
           
        </div>
        </>
     );
}
 
export default Product;
export const  getServerSideProps = async({params})=>{
    const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
    return{
        props:{
            pizza:res.data
        }
    }
}