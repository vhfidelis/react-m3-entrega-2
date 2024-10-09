import { MdClose } from 'react-icons/md';
import { CartItemCard } from './CartItemCard';
import styles from './CartModal.module.scss';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
export const CartModal = ({ cartList, setCartList, setIsOpen }) => {
	const total = cartList.reduce((prevValue, product) => {
		return prevValue + product.price * product.quantity;
	}, 0);
	const clearCart = () => {
		setCartList([]);
		toast.warn('Seu carrinho foi esvaziado');
	};
	const modalRef = useRef(null);
	const buttonRef = useRef(null);

	useEffect(() => {
		const handleOutclick = (e) => {
			!modalRef.current?.contains(e.target) ? setIsOpen(false) : null;
		};

		window.addEventListener('mousedown', handleOutclick);
		return () => {
			window.removeEventListener('mousedown', handleOutclick);
		};
	}, []);

	useEffect(() => {
		const handleKeydown = (e) => {
			e.key === 'Escape' ? buttonRef.current?.click() : null;
		};
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	}, []);

	return (
		<div role="dialog" className={styles.modal__overlay}>
			<div ref={modalRef} className={styles.modal__box}>
				<div className={styles.header}>
					<h2 className="heading3">Carrinho de compras</h2>
					<button
						ref={buttonRef}
						className={styles.close__btn}
						onClick={() => setIsOpen(false)}
						aria-label="close"
						title="Fechar"
					>
						<MdClose size={21} />
					</button>
				</div>
				<ul className={styles.cart__items}>
					{cartList.length > 0 ? (
						cartList.map((product) => (
							<CartItemCard
								key={`cart-${product.id}`}
								product={product}
								cartList={cartList}
								setCartList={setCartList}
							/>
						))
					) : (
						<p className={`heading1 ${styles.cart__empty}`}>
							{' '}
							O carrinho está vazio
						</p>
					)}
				</ul>

				<div className={styles.spacer}></div>
				<div className={styles.bottom__container}>
					<div className={styles.total__container}>
						<span className="body__600 black">Total</span>
						<span className="body__600">
							{total.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						</span>
					</div>
					<button className="btn" onClick={() => clearCart()}>
						Remover todos
					</button>
				</div>
			</div>
		</div>
	);
};
