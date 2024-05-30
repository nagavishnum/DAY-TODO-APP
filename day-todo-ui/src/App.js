import './App.css';
import Cards from './Cards';
import EnterTodo from './EnterTodo';
import Todos from './Todos';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDatabyDate } from './redux/Actions';

function App() {

  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const filteredtodos = useSelector(state => state.todos);

  const getData = () => {
    !loading && setloading(true);
    dispatch(getDatabyDate());
    setloading(false);

  }



  const showNotification = (title, body) => {
    // Check if the browser supports notifications
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      // If permission is already granted, show the notification
      new Notification(title, { body });
    } else if (Notification.permission !== 'denied') {
      // If permission is not granted or denied, request permission
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, { body });
        }
      });
    }
  };


  const checkTasks = async () => {
    const now = new Date();
    console.log(filteredtodos);
    console.log(now);

    filteredtodos.pendingTodos.forEach(task => {
      console.log("kk");
      console.log(task.time)
      const taskTime = new Date(task.time);
      console.log(taskTime, task.time);
      if (now.getTime() === taskTime.getTime()) {
        const title = `Reminder: ${task.todo}`;
        const time = `Time to start ${task.time}`;
        showNotification(title, time);
      }
    });
  }
  useEffect(() => {
    getData();
    checkTasks();

    // setInterval(() => {
    // }, 60000); // 60000 milliseconds = 1 minute

  }, [filteredtodos]);


  return (

    <div style={{ display: "flex", flexDirection: "column", gap: "20px", margin: "10px" }}>
      {!loading && <Cards data={filteredtodos} />}
      <EnterTodo />
      {!loading && <Todos todos={filteredtodos} />}
    </div>
  );
}

export default App;
