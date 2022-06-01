import { Email, Facebook, FacebookOutlined, Instagram, InstallDesktopOutlined, WhatsApp, WhatsappOutlined, WhatsappRounded } from '@mui/icons-material';
import { color } from '@mui/system';
import styles from '../styles/Footer.module.css'
const Footer = ()=>{
 return(
     <div className={styles.container}>
     <div className={styles.contact}>
     <h2>Contact Us</h2>
        <div className={styles.contact_properties}>
            <p>+91 8219262490</p>
            <p>kamalkishore2350@gmail.com</p>
            <div className={styles.contact_icons}>
            <Instagram style={{
                fontSize:'5vh',
                color:'rgb(225, 48, 108)',
                cursor:'pointer',
              
            }}/>
            <Facebook style={{
                fontSize:'5vh',
                color:'blue',
                cursor:'pointer',
            }}/>
            <WhatsApp style={{
                fontSize:'5vh',
                color:'rgb(138, 197, 49)',
                cursor:'pointer',
            }}/>
            </div>
        </div>
     </div>
        <div className={styles.links}>
            <h2>Links</h2>
            <div className={styles.link_links_container}>
                <ul>
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                    <li>Link 4</li>
                    <li>Link 5</li>
                    <li>Link 6</li>
                    <li>Link 7</li>
                    <li>Link 8</li>
                </ul>
            </div>
     </div>

     </div>
 );
}
export default Footer;