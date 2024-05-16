import './App.css';
import Cards from './page/Cards';
import Todos from './page/Todos';
import EnterTodo from './page/EnterTodo';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDateAction } from './redux/Actions';

function App() {

  const [data, setData] = useState({
    pending: [],
    ongoing: [],
    done: [],
    all: [],
    percent: []
  });

  const dispatch = useDispatch();

  const getData = async () => {
    const result = localStorage.getItem("userTodo");
    const parsedData = result && JSON.parse(result);
    if (parsedData) {
      const pending = await parsedData.filter((x) => x.status === "pending");
      const ongoing = await parsedData.filter((x) => x.status === "ongoing");
      const done = await parsedData.filter((x) => x.status === "done");
      setData((x) => ({ ...x, pending: pending, ongoing: ongoing, done: done, all: parsedData }));
    }
  }
  const getpercent = async () => {
    const result = localStorage.getItem("percent");
    const parsedData = result && JSON.parse(result);
    setData((x) => ({ ...x, percent: parsedData }));
  }

  const getDate = () => {
        //redux-thunk intercepts this action as it is a function.
    dispatch(getDateAction());
  }
  useEffect(() => {
    getData();
    getpercent();
    getDate();
  }, []);

  const date = useSelector(state => state?.date);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", margin: "10px" }}>
      <Cards data={data} date={date} getDate={getDate}/>
      <EnterTodo getData={getData} date={date} getDate={getDate}/>
      <Todos data={data} date={date} getData={getData} setData={setData} />
    </div>
  );
}

export default App;
