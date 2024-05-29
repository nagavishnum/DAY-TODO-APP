import './App.css';
import Cards from './Cards';
import EnterTodo from './EnterTodo';
import Todos from './Todos';
import {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDatabyDate } from './redux/Actions';

function App() {

  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);

  const filteredtodos = useSelector(state => state.todos);
  const dates = useSelector(state => state.dates);
  console.log(filteredtodos);

  const getData = async () => {
    setloading(true);
    dispatch(getDatabyDate());
    setloading(false);
  }
  useEffect(() => {
    getData();
  }, []);

  return (

    <div style={{ display: "flex", flexDirection: "column", gap: "20px", margin: "10px" }}>
      {!loading && <Cards data={filteredtodos} />}      <EnterTodo dates={dates} />
      <Todos todos={filteredtodos} loading={loading} />
    </div>
  );
}

export default App;
