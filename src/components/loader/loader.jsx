import styles from './loader.module.css'
import logo from './logo_splash.svg'

function Loader() {

    return (
        <div className={styles.loader}><img src={logo}/>Loading...</div>
    )

}
export default Loader;