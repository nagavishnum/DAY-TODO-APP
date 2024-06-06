import './App.css';
import Cards from './Cards';
import EnterTodo from './EnterTodo';
import Todos from './Todos';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteByDate, getDatabyDate } from './redux/Actions';

function App() {

  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const filteredtodos = useSelector(state => state.todos);

  const getData = useCallback(() => {
    !loading && setloading(true);
    dispatch(getDatabyDate());
    setloading(false);
  }, [dispatch, loading])


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


  const checkTasks = useCallback(async (filteredtodos) => {
    const now = new Date();
    now.setSeconds(0);
    const currentTime = now.toLocaleTimeString([], { hour12: false });
    filteredtodos.pendingTodos.forEach(task => {
      const taskTime = task.time;

      if (currentTime === taskTime) {
        const title = `Reminder`;
        const body = `${task.todo}.\nTime to start ${taskTime}.\nPriority : ${task.priority}`;
        showNotification(title, body);
      }
    });
  }, [])

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkTasks(filteredtodos);
    }, 50000);

    return () => clearInterval(intervalId);
  }, [filteredtodos, checkTasks]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(deleteByDate());
    }, 1800000);
    dispatch(deleteByDate())
    return () => clearInterval(intervalId);

  }, [])


  return (

    <div style={{ display: "flex", flexDirection: "column", gap: "20px", margin: "10px" }}>
      {!loading && <Cards data={filteredtodos} />}
      <EnterTodo />
      {!loading && <Todos todos={filteredtodos} />}
    </div>
  );
}

export default App;
