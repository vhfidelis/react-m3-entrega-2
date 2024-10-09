import { toast } from 'react-toastify';
import styles from './Cards.module.scss';
export const ProductCard = ({ product, cartList, setCartList }) => {
	const addToCart = (itemToAdd) => {
		const alreadyInCart = cartList.find(
			(cartItem) => itemToAdd.id === cartItem.id
		);

		if (!alreadyInCart) {
			const newProduct = { ...product, quantity: 1 };
			setCartList([...cartList, newProduct]);
		} else {
			const newCartList = cartList.map((cartItem) => {
				if (cartItem.id === itemToAdd.id) {
					return { ...cartItem, quantity: cartItem.quantity + 1 };
				}
				return cartItem;
			});
			setCartList(newCartList);
		}
		toast.success('Item adicionado ao carrinho');
	};
	return (
		<li className={styles.container}>
			<div className={styles.img__container}>
				<img src={product.img} alt={product.name} />
			</div>
			<div className={styles.data__container}>
				<h3 className={'heading3 ' + styles.title}>{product.name}</h3>
				<span className={'caption ' + styles.category}>{product.category}</span>
				<span className="body">
					{product.price.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}
				</span>
				<button className={'btn__medium'} onClick={() => addToCart(product)}>
					Adicionar
				</button>
			</div>
		</li>
	);
};
