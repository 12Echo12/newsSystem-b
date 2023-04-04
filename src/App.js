import './App.css';
import MyRouter from './router';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <MyRouter></MyRouter>
      </Provider>
  );
}

export default App;
