import { AppRouter } from "./router/AppRouter";
import Modal from 'react-modal';

Modal.setAppElement('#root');
function App() {
	return <AppRouter />;
}

export default App;
