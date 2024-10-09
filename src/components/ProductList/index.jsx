import { ProductCard } from './ProductCard';
import styles from './ProductList.module.scss';

export const ProductList = ({ productList, cartList, setCartList }) => {
	return (
		<ul className={styles.container}>
			{productList.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
					cartList={cartList}
					setCartList={setCartList}
				/>
			))}
		</ul>
	);
};
