import { HomePage } from './pages/HomePage';
import './styles/Buttons.scss';
import './styles/Typography.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<>
			<ToastContainer autoClose={1000} />
			<HomePage />
		</>
	);
};

export default App;
