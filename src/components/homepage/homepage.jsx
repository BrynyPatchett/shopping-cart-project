import Carousel from '../carousel/carousel';
import { useOutletContext } from "react-router-dom"
import styles from './homepage.module.css'


function Homepage() {
    const {
        products
    } = useOutletContext();

    return (<div >

        {/*Display first three items*/}
        <Carousel featuredItems={products[0].slice(0, 3)} />
    </div>)
}


export default Homepage;