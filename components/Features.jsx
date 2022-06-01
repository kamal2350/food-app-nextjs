import Image from "next/image";
import styles from '../styles/Features.module.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { fontWeight, width } from "@mui/system";
import { Button } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import { useState } from "react";
import { Fade, Zoom } from "react-reveal";
const Features = () => {
    const [index, setIndex]= useState(0);
    const handleArrow =(param)=>{


        if(param==="left"){
            setIndex(index===0?2:index-1);
        }
        if(param==="right"){    
            setIndex(index!==2?index+1:0);
        }
    }
    console.log(index);
    const images=[
        {
            id:1,
            title:"Fresh Home Made Pizza's",
            image:"/images/img2.png",
        },
        {
            id:2,
            title:"Cheeze Pizza's",
            image:"/images/img1.png",
        },
        {
            id:3,
            title:"Exotic Combo's",
            image:"/images/img3.png",
        }
        
    ]
   
    return (  
        <>
        <Fade left>  
        <div className={styles.container}>
            <div className={styles.arrowcontainer} style={{left:'0',top:'50%', bottom:'50%'}} onClick={()=>handleArrow("left")}>
                <KeyboardArrowLeftIcon />
            </div>

            <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
                 
                
                {images.map((img,i)=>(
                    <div className={styles.eachwrapper} key={i}>
                        
                        <div className={styles.imgcontainer}>
                            <img className={styles.image} src={img.image} height="70%"/>
                        </div>
                        <div className={styles.textcontainer}>
                            <h2 className={styles.heading}>{img.title}</h2>
                            <p className={styles.p}> Enjoy the taste of home made pizza</p>
                            
                                <Button className={styles.btn}
                                variant="contained" 
                                endIcon={<ShoppingBag/>}
                                
                                >
                                Order Now!
                                </Button>
                            
                        </div>
                        
                    </div>
                ))}
            
            </div>
            <div className={styles.arrowcontainer} style={{right:'0',top:'50%', bottom:'50%'}} onClick={()=>handleArrow("right")} >
                    <KeyboardArrowRightIcon/>
            </div>
        </div> 
        </Fade> 
       
        </>
    );
}
 
export default Features;