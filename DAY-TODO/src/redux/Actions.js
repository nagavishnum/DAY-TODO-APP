//action types
export const START_EXECUTION = 'START_EXECUTION';
export const EXECUTION_SUCCESS = 'EXECUTION_SUCCESS';
export const EXECUTION_FAILURE = 'EXECUTION_FAILURE';

//action creators
const startExecution = () => ({
    type: START_EXECUTION
});

const executionSuccess = result => ({
    type: EXECUTION_SUCCESS,
    payload: result
});

const executionFailure = error => ({
    type: EXECUTION_FAILURE,
    payload: error
});

//thunk func to execute desired code
export const getDateAction = () => {
    return async (dispatch, getState) => {
        try {
            // Dispatch action to indicate start of execution
            dispatch(startExecution());

            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const day = currentDate.getDate();
            const result = `${month}-${day}-${year}`;

            // Dispatch action to indicate success and store the result
            dispatch(executionSuccess(result));
        } catch (error) {
            // Dispatch action to indicate failure
            dispatch(executionFailure(error));
        }
    };
};
