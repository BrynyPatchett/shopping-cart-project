import { NavLink,Link} from "react-router-dom";
import styles from './navbar.module.css'
import logo from './logo_placeholder.svg'

function Navbar({navlinks,cart}){


return(<nav className={styles.navbar}>
<div className={styles.imageContainer}><NavLink to="/" className={({isActive}) => 
            isActive ? styles.disable : ""}><img  src={logo}/></NavLink></div>
<div className={styles.navlinksContainer}>
    {navlinks && navlinks.map((link,i) => {
        return(<div key={i} className={styles.navlink}>
           {<NavLink key={i} className={({isActive}) => 
            isActive ? `${styles.disable} ${styles.active}` : ""
           } to={link.path}>{link.text}</NavLink>}
        </div>)
    })}
<div><NavLink to='checkout'>CART:{cart.reduce((total,item) => total + item.itemCount,0)}</NavLink></div></div>
</nav>)

}

export default Navbar;



