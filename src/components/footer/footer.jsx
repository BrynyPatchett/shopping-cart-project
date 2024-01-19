import logoSplash from './logo_placeholder.svg'
import styles from './footer.module.css'

function Footer(){

    return(<>
    <div className={styles.footer}><img src={logoSplash} alt="" /></div>
    </>)
}

export default Footer;