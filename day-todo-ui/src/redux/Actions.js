const filtertodos = (todos, dispatch, filteredtodos) => {
    const pendingData = todos?.filter((x) => x.status === "PENDING");
    const ongoingData = todos?.filter((x) => x.status === "ONGOING");
    const doneData = todos?.filter((x) => x.status === "DONE");
    const notDoneTasks = todos?.filter((x) => x.status !== "DONE");

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
    filteredtodos = {
        ...filteredtodos,
        pendingTodos: pendingData,
        ongoingTodos: ongoingData,
        doneTodos: doneData,
        donePercent: Math.round(Percent),
        dueCount: dueLength,
        todoCount: todosCount,
    };
    dispatch({ type: "GET_TODO_BY_DATE", payload: filteredtodos })
}

export const getDatabyDate = (filterpriority) => {
    return async (dispatch) => {
        let res;
        if (filterpriority) {
            res = await fetch(`http://localhost:8081/filterByDatePrioroty/${filterpriority}`, { method: "GET", headers: { "Content-Type": "application/json" }, });
        }
        else {
            res = await fetch(`http://localhost:8081/getAllTodos`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
        }
        if ([200, 201].includes(res.status)) {
            const jsontodos = await res.json();
            let filteredtodos = {
                pendingTodos: [],
                ongoingTodos: [],
                doneTodos: [],
                donePercent: '',
                dueCount: '',
                todoCount: '',
            }
            jsontodos && filtertodos(jsontodos, dispatch, filteredtodos);
        }
    }
}