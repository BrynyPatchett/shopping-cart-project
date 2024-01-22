import styles from './hamburger.module.css'
import closeIcon from './closeIcon.svg'
import openIcon from './openIcon.svg'

function Hamburger({open}) {
    return (<div className={styles.navMenu + " " +(open?styles.open:"")}>
       <img src={!open?openIcon:closeIcon}/>
    </div>
    )
}


export default Hamburger;