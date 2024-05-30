const initialstate = {
    todos :{
        pendingTodos: [],
        ongoingTodos: [],
        doneTodos: [],
        donePercent: '',
        dueCount: '',
        todoCount: '',
        dueTasks:[]
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
                    ...action.payload
                },
                dates: {
                    ...state.dates,
                    minDate: action.payload.minDate,
                    maxDate: action.payload.maxDate
                }
            };
            case "GET_TODO_BY_DATE_PRIORITY":
                return {
                    ...state,
                    todos: {
                        ...state.todos,
                        ...action.payload
                    },
                }
                case "FILTER_DUE_TODOS" :
                    return {
                        ...state,
                        todos:{
                            ...state.todos,
                            ...action.payload
                        }
                    }
            default:
                return state;
    }
}

export default reducer;