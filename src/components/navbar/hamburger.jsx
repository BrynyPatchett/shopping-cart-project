import styles from './hamburger.module.css'


function Hamburger() {
    return (<div className={styles.navMenu}>
        <span></span>
        <span></span>
        <span className={styles.lastSpan}></span>
    </div>
    )
}


export default Hamburger;