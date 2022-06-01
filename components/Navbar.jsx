import Image from 'next/image';
import styles from '../styles/Navbar.module.css';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import Link from 'next/link';
const Navbar = ()=>{
    const quantity = useSelector(state=>state.cart.cartQuantity);

    return(

        <>
            <div className={styles.container}>  {/*navbar starts from here */}

                <div className={styles.item}>   {/* left section */}
                    <div className={styles.callButton}>
                        <PhoneIcon style={{color:'skyblue', fontSize:'50px'} }  />
                    </div>

                    <div className={styles.texts}>
                        <div className={styles.text}>
                            +91 8219262490
                        </div>              
                        <div className={styles.text}>
                            ORDER NOW!
                        </div>
                    </div>
                </div>

                {/* center starts */}

                <div className={styles.item}>
                    <ul className={styles.list}>
                        <Link href="/" passHref>

                        <li className={styles.listitem}>Home Page</li>
                        </Link>
                        <li className={styles.listitem}>Products</li>
                         <span className={styles.logo}>Kamal</span>
                        <li className={styles.listitem}>Menu</li>
                        <li className={styles.listitem}>Blog</li>
                        <li className={styles.listitem}>Contact us</li>
                    </ul>
                </div>
                <Link href="/cart" passHref>
                    <div className={styles.item}>
                        <div className={styles.right}>
                            <Badge badgeContent={quantity}>
                                <ShoppingCartOutlinedIcon   style={{color:'orange', fontSize:'30px'}}/>
                            </Badge> 
                        </div>
                    
                    
                    </div>
                </Link>
            
            </div>
        </>
    );
   }
   export default Navbar;