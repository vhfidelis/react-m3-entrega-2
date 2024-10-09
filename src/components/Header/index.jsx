import { useState } from 'react';
import Logo from '../../assets/Logo.svg';
import { MdSearch, MdShoppingCart } from 'react-icons/md';
import styles from './Header.module.scss';

export const Header = ({ setIsOpen, cartList }) => {
	const [value, setValue] = useState('');
	const [searchEnable, setSearchEnable] = useState(false);
	const totalInCart = () => {
		let total = 0;
		cartList.forEach((item) => (total += item.quantity));
		return total;
	};

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<img src={Logo} alt="Logo Kenzie Burguer" />

				<div>
					<form>
						{searchEnable ? (
							<input
								type="text"
								value={value}
								onChange={(e) => setValue(e.target.value)}
							/>
						) : null}

						<button
							onClick={(e) => {
								e.preventDefault();
								setSearchEnable(!searchEnable);
							}}
							className={styles.search__button}
							type="submit"
						>
							<MdSearch size={30} />
						</button>
					</form>
					<button
						className={styles.cart__button}
						onClick={() => setIsOpen(true)}
					>
						<MdShoppingCart size={25} />
						<span>{totalInCart()}</span>
					</button>
				</div>
			</div>
		</header>
	);
};
