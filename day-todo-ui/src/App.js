import logo from './logo.svg';
import './App.css';
import Cards from './Cards';
import EnterTodo from './EnterTodo';
import Todos from './Todos';

function App() {
  return (
    
<div style={{ display: "flex", flexDirection: "column", gap: "20px", margin: "10px" }}>
      {/* <Cards/> */}
      <EnterTodo />
      {/* <Todos  /> */}
    </div>  );
}

export default App;
