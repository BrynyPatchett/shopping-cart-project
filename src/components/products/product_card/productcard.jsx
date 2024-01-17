import { Link } from 'react-router-dom';
import styles from './productCard.module.css'


function ProductCard({ productId, title, price, imagesrc }) {
  return (
    <>
      <Link to={`/product/${productId}`} className={styles.productCard}>
        <img src={imagesrc} alt={title} />
        <div className={styles.productInfo}>
            <h3>{title}</h3>
            <h3>${price}</h3>
        </div>
      </Link>
    </>
  );
}

export default ProductCard;
