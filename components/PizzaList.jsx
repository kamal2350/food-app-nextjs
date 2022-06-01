import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';
import { Fade,Reveal } from 'react-reveal';
const PizzaList = ({pizzaList}) => {
    const list=[
        {   id:1,
            img:'/images/img2.png',
            title:'cheese pizza',
            price:'300',
        },
        {   id:2,
            img:'/images/img3.png',
            title:'Exotic Cheese Combo',
            price:'400',
        },
        {   id:3,
            img:'/images/img1.png',
            title:'Veg pizza',
            price:'200',
        },
        {   id:4,
            img:'/images/img2.png',
            title:'cheese pizza',
            price:'300',
        },
        {   id:5,
            img:'/images/img2.png',
            title:'cheese pizza',
            price:'300',
        },
        {   id:6,
            img:'/images/img2.png',
            title:'cheese pizza',
            price:'300',
        },
        {   id:7,
            img:'/images/img2.png',
            title:'cheese pizza',
            price:'300',
        },
        {   id:8,
            img:'/images/img2.png',
            title:'cheese pizza',
            price:'300',
        }
    ]
    console.log(pizzaList);
    return ( 
        <>
            <Fade left>
                    <div className={styles.container}>
                    <Reveal effect="fadeInUp" >
                    <h2 className={styles.heading}>Best Pizza in Town</h2></Reveal>
                    <p className={styles.desc}>assages, and more recently with desktop publishing
                     software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <div className={styles.card}>
                    {pizzaList.map((pizza)=>(
                        <PizzaCard  key={pizza._id} pizza={pizza} />

                    ))}
                    </div>
                </div>
            </Fade>
        </>
     );
}
 
export default PizzaList;