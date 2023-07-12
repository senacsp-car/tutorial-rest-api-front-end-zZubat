import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeSreen from './screens/HomeScreen';
import ItemScreen from './screens/ItemScreen';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomeSreen/>}></Route>
        <Route path='/itens/:id' element={<ItemScreen/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
