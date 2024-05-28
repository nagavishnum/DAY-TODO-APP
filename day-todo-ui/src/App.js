import './App.css';
import Cards from './Cards';
import EnterTodo from './EnterTodo';
import Todos from './Todos';
import { useCallback, useEffect, useState } from 'react';

function App() {

  const [filteredtodos, setFilteredTodos] = useState({
    pendingTodos: [],
    ongoingTodos: [],
    doneTodos: [],
    donePercent: "",
    dueCount: '',
    todoCount:""
  });
  const [loading, setloading] = useState(true);
  const [dates, setDate] = useState({
    min:'',
    max:''
});

  const getData = useCallback(async (minDate) => {
    setloading(true);
    const res = await fetch(`http://localhost:8081/todosByDate/${minDate}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });
    
    if([200,201].includes(res.status)){
      const jsontodos = await res.json();
      jsontodos && filtertodos(jsontodos);

    }
    setloading(false);
  },[]);

  const filtertodos = (todos) => {
    const pendingData = todos?.filter((x) => x.status === "PENDING");
    const ongoingData = todos?.filter((x) => x.status === "ONGOING");
    const doneData = todos?.filter((x) => x.status === "DONE");
    const notDoneTasks = todos?.filter((x)=> x.status !== "DONE");

    const todosCount = todos?.length;
    const doneCount = doneData?.length;
    const Percent = doneCount / todosCount * 100;

    const currentTime = new Date();
    const currentHours = currentTime.getHours().toString().padStart(2, '0');
    const currentMinutes = currentTime.getMinutes().toString().padStart(2, '0');
    const currentSeconds = currentTime.getSeconds().toString().padStart(2, '0');

    const formattedCurrentTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;

    const due = notDoneTasks?.filter(task => task.time < formattedCurrentTime);
    const dueLength = due.length;
    setFilteredTodos((data) => ({ ...data, pendingTodos: pendingData, ongoingTodos: ongoingData, doneTodos: doneData, donePercent: Math.round(Percent), dueCount: dueLength ,todoCount:todosCount}));
    setloading(false);
  }
  const addLeadingZero = (number) => {
    return number < 10 ? `0${number}` : number;
};
  const getDate=async ()=> {
    setloading(true);
    const date = new Date();
    const minDate = `${addLeadingZero(date.getFullYear())}-${addLeadingZero(date.getMonth() + 1)}-${addLeadingZero(date.getDate())}`;
    const maxDateObj = new Date(date);
    maxDateObj.setDate(date.getDate() + 5);
    const maxDate = `${addLeadingZero(maxDateObj.getFullYear())}-${addLeadingZero(maxDateObj.getMonth() + 1)}-${addLeadingZero(maxDateObj.getDate())}`;
    setDate({ min: minDate, max: maxDate });
    getData(minDate);
  }
  useEffect(() => {
    getDate();
}, []);

  return (

    <div style={{ display: "flex", flexDirection: "column", gap: "20px", margin: "10px" }}>
{      !loading && <Cards data={filteredtodos} />
}      <EnterTodo getData={getData} dates={dates}/>
      <Todos todos={filteredtodos} loading={loading} getData={getData} />
    </div>
  );
}

export default App;
