import { useRef, useState } from "react";
import { getDatabyDate } from "./redux/Actions";
import { useDispatch } from "react-redux";

const EnterTodo = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const formData = useRef({
        todoName: useRef(null),
        todoPriority: useRef(null),
        todoTime: useRef(null),
    });

    const validationCheck = async () => {
        for (const key in formData.current) {
            if (!formData.current[key].current.value) {
                return false;
            }
        }
        return true;
    }

    const resetFormData = () => {
        for (const key in formData.current) {
            formData.current[key].current.value = '';
        }
    }
    const handleSubmit = async () => {
        const validationstatus = await validationCheck();
        if (validationstatus) {
            setLoading(true);
            const obj1 = {
                todo: formData.current.todoName.current.value,
                priority: formData.current.todoPriority.current.value,
                time: formData.current.todoTime.current.value,
            };
            const res = await fetch("http://localhost:8081/saveTodo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj1)
            });
            if ([200, 201].includes(res.status)) {
                resetFormData();
                dispatch(getDatabyDate());
            }
            else {
                window.alert(res.statusText);
            }
            setLoading(false);
        } else {
            window.alert("Enter Required Data");
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "space-evenly" }}>
            <input autoFocus type="text" ref={formData.current.todoName} placeholder="Enter Todo" />
            <select id="priority" name="priority" ref={formData.current.todoPriority}>
                <option value="">Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <input type="time" ref={formData.current.todoTime} />
            <button style={{ backgroundColor: "#4169E1", borderRadius: "10px", height: "40px", border: "none", cursor: "pointer", width: "300px" }} disabled={loading} onClick={handleSubmit}>
                {loading ? "Loading" : "Save Todo"}
            </button>
        </div>
    );
};

export default EnterTodo;
