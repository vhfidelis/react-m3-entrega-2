import { useEffect, useState } from 'react';
import { CartModal } from '../../components/CartModal';
import { Header } from '../../components/Header';
import { ProductList } from '../../components/ProductList';
import { api } from '../../services/api';

export const HomePage = () => {
	const localCart = localStorage.getItem('@KenzieBurguer - localCart');
	const [productList, setProductList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [cartList, setCartList] = useState(
		localCart ? JSON.parse(localCart) : []
	);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const getProducts = async () => {
			try {
				setLoading(true);
				const { data } = await api.get('products');
				setProductList(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		getProducts();
	}, []);

	useEffect(() => {
		const setLocalCart = () =>
			cartList.length == 0
				? localStorage.clear()
				: localStorage.setItem(
						'@KenzieBurguer - localCart',
						JSON.stringify(cartList)
				  );
		setLocalCart();
	}, [cartList]);

	return (
		<>
			<Header cartList={cartList} setIsOpen={setIsOpen} />
			<main>
				{loading ? (
					<p className="loading">Carregando ...</p>
				) : (
					<ProductList
						productList={productList}
						cartList={cartList}
						setCartList={setCartList}
					/>
				)}
				{isOpen ? (
					<CartModal
						setIsOpen={setIsOpen}
						cartList={cartList}
						setCartList={setCartList}
					/>
				) : null}
			</main>
		</>
	);
};
