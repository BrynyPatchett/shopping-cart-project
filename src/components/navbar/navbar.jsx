import { Link } from "react-router-dom";
import styles from './navbar.module.css'
import logo from './logo_placeholder.svg'

function Navbar({navlinks}){


return(<nav className={styles.navbar}>
<div className={styles.imageContainer}><img  src={logo}/></div>
<div className={styles.navlinksContainer}>
    {navlinks && navlinks.map((link,i) => {
        return(<div key={i} className={styles.navlink}>
            <Link key={i} to={link.path}>{link.text}</Link>
        </div>)
    })}
<div>CART</div></div>
</nav>)

}

export default Navbar;



