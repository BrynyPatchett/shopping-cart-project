import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './carousel.module.css'


function Carousel({featuredItems}){
const [currentSelectedIndex,setCurrentSelectedIndex] = useState(0);
useEffect(() =>{
    console.log(`Current Selected Index: ${currentSelectedIndex}`)
},[currentSelectedIndex])

    return(<div className={styles.carousel}>
       { featuredItems.map((elem,i) => {
        

       return <Link key={elem.productID} to={`/product/${elem.productID}`}><div className={styles.slide + " " + styles.fade + " " + (i === currentSelectedIndex ? styles.show : "not shown")}>
        <img className={styles.slideImage} src={elem.imagesrc}/>
        <div className={styles.slideCaption}>{elem.title}</div>
       </div></Link>
       })}
       <a className={styles.slidePrev} onClick={()=>{setCurrentSelectedIndex(currentSelectedIndex => (currentSelectedIndex > 0 ? currentSelectedIndex - 1 : featuredItems.length -1))}}>&#10094;</a>
       <a className={styles.slideNext} onClick={()=>{setCurrentSelectedIndex(currentSelectedIndex => (currentSelectedIndex < featuredItems.length -1 ? currentSelectedIndex + 1 : 0))}}>&#10095;</a>
       <br/>
       <div className={styles.pagination}>
        {
            featuredItems.map((elem,i) => {
                return <span key={i} className={styles.dot + " " + (i === currentSelectedIndex ? styles.activeDot : "")} onClick={()=>setCurrentSelectedIndex(i)}></span>
            })
        }
        </div>
    </div>)

}

export default Carousel;