import styles from '../styles/PizzaCard.module.css'
import axios from 'axios';
import Link from 'next/link';
const PizzaCard = ({pizza}) => {
    return ( 
        <div className={styles.container}>
             <p className={styles.title}>{pizza.title}</p>
             <Link href={`/product/${pizza._id}`} passHref >
                <img  className={styles.image} src ={pizza.image} alt=''/>
             </Link>           
            {/* <desc>{pizza.description}</desc> */}
            <p className={styles.price}>starts from <span>₹{pizza.price[0]}</span></p>
        </div>
     );
}
 
export default PizzaCard;
