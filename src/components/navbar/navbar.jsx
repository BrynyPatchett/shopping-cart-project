import { NavLink, Link } from "react-router-dom";
import styles from "./navbar.module.css";
import logo from "./logo_placeholder.svg";
import Hamburger from "./hamburger";
import { useState,useEffect,useRef } from "react";

function Navbar({ navlinks, cart }) {

    let menuRef = useRef();

  const [openMenu, setOpen] = useState(false);
  function displayMobileNav() {
    setOpen(!openMenu);
  }

  useEffect(()=>{
    let handler = (e)=>{
        if(!menuRef.current.contains(e.target)){
         setOpen(false)
        }
    }
    document.addEventListener("mousedown",handler);
  })




  return (
    <nav className={styles.navbar}>
      <div className={styles.imageContainer}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.disable : "")}
        >
          <img src={logo} />
        </NavLink>
      </div>
      <div
        className={styles.navWrapper + " " + (openMenu ? styles.openMenu : "")}
      ref={menuRef} >
        <div className={styles.navlinksContainer}>
          {navlinks &&
            navlinks.map((link, i) => {
              return (
                <div key={i} className={styles.navlink}>
                  {
                    <NavLink
                      key={i}
                      className={({ isActive }) =>
                        isActive ? `${styles.disable} ${styles.active}` : ""
                      }
                      to={link.path}
                    >
                      {link.text}
                    </NavLink>
                  }
                </div>
              );
            })}
        </div>
        {/* <div className={styles.cart}><NavLink to='checkout'>CART:{cart.reduce((total,item) => total + item.itemCount,0)}</NavLink>
</div> */}
        <div className={styles.cart}>
          <p>CART: {cart.reduce((total, item) => total + item.itemCount, 0)}</p>
          <div className={styles.cartNav}>
            <div className={styles.cartNavList}>{
                cart.map((elem)=>{
                   return <div className={styles.cartnavListItem}>
                    <div className={styles.navImageContainer}><img src={elem.product.imagesrc}></img></div>
                    <div className={styles.cartnavListItemTitle}><p>{elem.product.title}</p></div>
                    <div>{elem.product.price}</div>
                    </div>
                })
            }
            </div>
            <div className={styles.cartNavCheckout}>
              <NavLink class={styles.checkoutLink}to='checkout'>Checkout</NavLink>
            </div>
          </div>
        </div>
      </div>

      <div
        className={openMenu?styles.hamburgerOpen:styles.hamburger}
         onClick={() => displayMobileNav() }
      >
        <Hamburger open={openMenu} />
        
      </div>
    </nav>
  );
}

export default Navbar;
