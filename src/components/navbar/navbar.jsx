import { NavLink,Link} from "react-router-dom";
import styles from './navbar.module.css'
import logo from './logo_placeholder.svg'
import Hamburger from "./hamburger";
import { useState } from "react";

function Navbar({navlinks,cart}){
const [openMenu,setOpen] = useState(false);
    function displayMobileNav(){
        console.log("mouse change")
        setOpen(!openMenu);
    };


return(<nav className={styles.navbar}>
<div className={styles.imageContainer}><NavLink to="/" className={({isActive}) => 
            isActive ? styles.disable : ""}><img  src={logo}/></NavLink></div>
<div className={styles.navWrapper + ' ' + (openMenu? styles.openMenu : '')}>
<div className={styles.navlinksContainer}>
    {navlinks && navlinks.map((link,i) => {
        return(<div key={i} className={styles.navlink}>
           {<NavLink key={i} className={({isActive}) => 
            isActive ? `${styles.disable} ${styles.active}` : ""
           } to={link.path}>{link.text}</NavLink>}
        </div>)
    })}
    </div>
<div className={styles.cart}><NavLink to='checkout'>CART:{cart.reduce((total,item) => total + item.itemCount,0)}</NavLink>
</div>
</div>

<div className={styles.hamburgerHover} onMouseOver={()=>displayMobileNav() } onMouseLeave={()=>displayMobileNav()}><Hamburger/></div>
</nav>)

}

export default Navbar;



