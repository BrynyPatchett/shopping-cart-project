import { Link } from 'react-router-dom';
import styles from './productCard.module.css'


function ProductCard({ productId, title, price, imagesrc }) {
  return (
    <>
      <Link to={`/product/${productId}`} className={styles.productCard}>
        <img src={imagesrc} alt={title} />
        <div className={styles.productInfo}>
            <p>{title}</p>
            <p className={styles.price}>${price}</p>
        </div>
      </Link>
    </>
  );
}

export default ProductCard;
