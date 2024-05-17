import { useRef, useState } from "react";

const EnterTodo = ({ getData }) => {
    const userTodo = useRef(null);
    const prioritySelect = useRef(null);
    const timeInput = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (userTodo.current.value && prioritySelect.current.value && timeInput.current.value) {
            setLoading(true);
            const obj1 = {
                todo: userTodo.current.value,
                priority: prioritySelect.current.value, // Get the selected priority value
                time: timeInput.current.value // Get the value from the time input
            };

            const res = await fetch("http://localhost:8081/saveTodo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj1)
            });
            if ([200, 201].includes(res.status)) {
                userTodo.current.value = "";
                prioritySelect.current.value = "";
                timeInput.current.value = "";
                getData();
            }
            else {
                window.alert(res.statusText);
            }
            setLoading(false);
        } else {
            window.alert("Enter Required Data");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "space-evenly" }}>
            <input autoFocus type="text" ref={userTodo} placeholder="Enter Todo" />
            <select id="priority" name="priority" ref={prioritySelect}>
                <option value="">Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <input onKeyPress={handleKeyPress} type="time" ref={timeInput} />
            <button style={{ backgroundColor: "#2ecc71", borderRadius: "10px", height: "40px", border: "none", cursor: "pointer", width: "300px" }} disabled={loading} onClick={handleSubmit}>
                {loading ? "Loading" : "Save Todo"}
            </button>
        </div>
    );
};

export default EnterTodo;
