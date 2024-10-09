import { MdDelete } from 'react-icons/md';
import styles from './CartItemCard.module.scss';
import { toast } from 'react-toastify';
export const CartItemCard = ({ product, cartList, setCartList }) => {
	const removeCartItem = (itemToRemove) => {
		const newCartList = cartList.filter((curr) => curr.id != itemToRemove.id);
		toast.error('Item removido do carrinho');
		setCartList(newCartList);
	};
	const addQuantity = (itemToAdd) => {
		const newCartList = cartList.map((item) =>
			itemToAdd.id === item.id ? { ...item, quantity: item.quantity + 1 } : item
		);
		setCartList(newCartList);
	};
	const removeQuantity = (itemToSubtract) => {
		const newCartList = cartList.map((item) => {
			if (itemToSubtract.id === item.id) {
				if (itemToSubtract.quantity - 1 >= 1) {
					return { ...item, quantity: item.quantity - 1 };
				} else {
					return item;
				}
			} else {
				return item;
			}
		});
		setCartList(newCartList);
	};

	return (
		<li className={styles.container}>
			<div className={styles.img__container}>
				<img src={product.img} alt={product.name} />
			</div>
			<div className={styles.right__container}>
				<div className={styles.data}>
					<p className="heading3">{product.name}</p>
					<p className="body">
						{product.price.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</p>
				</div>
				<div className={styles.justify__container}>
					<div className={styles.qnt__container}>
						<p className="heading4">Quant.</p>
						<div className={styles.qnt__inner__container}>
							<button onClick={() => removeQuantity(product)}>-</button>
							<span className="body black">{product.quantity}</span>
							<button onClick={() => addQuantity(product)}>+</button>
						</div>
					</div>
					<button
						onClick={() => removeCartItem(product)}
						aria-label="delete"
						title="Remover item"
					>
						<MdDelete size={21} />
					</button>
				</div>
			</div>
		</li>
	);
};
