import { useEffect, useRef, useState } from "react";

const EnterTodo = ({ getData ,dates}) => {

    const [loading, setLoading] = useState(false);
    const {min,max}= dates;

    const formData = useRef({
        todoName: useRef(null),
        todoPriority: useRef(null),
        todoDate: useRef(min),
        todoTime: useRef(null),
        todoNotifybefore: useRef(null)
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
        for(const key in formData.current){
            formData.current[key].current.value = '';
        }
    }
    const handleSubmit = async () => {
        const validationstatus = await validationCheck();
        if (validationstatus) {
            setLoading(true);
            console.log(formData.current);
            const obj1 = {
                todo: formData.current.todoName.current.value,
                priority:formData.current.todoPriority.current.value,
                date: formData.current.todoDate.current.value,
                time: formData.current.todoTime.current.value,
                notifyBefore : formData.current.todoNotifybefore.current.value
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
            <input autoFocus type="text" ref={formData.current.todoName} placeholder="Enter Todo" />
            <select id="priority" name="priority" ref={formData.current.todoPriority}>
                <option value="">Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <input type="date" ref={formData.current.todoDate} defaultValue={min} min={min} max={max}/>
            <input type="time" ref={formData.current.todoTime} />
            <select id="notify" name="notify" ref={formData.current.todoNotifybefore} onKeyPress={handleKeyPress}>
                <option value="">Notify before</option>
                <option value='0'>Never</option>
                <option value='5'>5 min</option>
                <option value='10'>10 min</option>
                <option value='15'>15 min</option>
            </select>
            <button style={{ backgroundColor: "#2ecc71", borderRadius: "10px", height: "40px", border: "none", cursor: "pointer", width: "300px" }} disabled={loading} onClick={resetFormData}>
                {loading ? "Loading" : "Save Todo"}
            </button>
        </div>
    );
};

export default EnterTodo;
