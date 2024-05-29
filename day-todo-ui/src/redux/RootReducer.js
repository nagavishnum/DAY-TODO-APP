const initialstate = {
    todos :{
        pendingTodos: [],
        ongoingTodos: [],
        doneTodos: [],
        donePercent: '',
        dueCount: '',
        todoCount: ''
    },
    dates:{
        minDate:'',
        maxDate:''
    }
}

const reducer =(state = initialstate,action)=> {
    switch(action.type){
        case "GET_TODO_BY_DATE":
            return {
                ...state,
                todos: {
                    ...state.todos,
                    pendingTodos: action.payload.pendingTodos,
                    ongoingTodos: action.payload.ongoingTodos,
                    doneTodos: action.payload.doneTodos,
                    donePercent: action.payload.donePercent,
                    dueCount: action.payload.dueCount,
                    todoCount: action.payload.todoCount,
                },
                dates: {
                    ...state.dates,
                    minDate: action.payload.minDate,
                    maxDate: action.payload.maxDate
                }
            };
            default:
                return state;
    }
}

export default reducer;