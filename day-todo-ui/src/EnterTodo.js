import {useRef, useState } from "react"

const EnterTodo = ({ getData}) => {
    const userTodo = useRef(null);
    const [loading, setloading] = useState(false);

    const handleSubmit = async () => {
        if (userTodo.current.value) {
            setloading(true);
            const obj1 = {
                name: userTodo.current.value,
            }
            fetch("/saveTodo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj1)
            }).then(res => {
                console.log(res);
            })
            
        }
        else {
            window.alert("Please Enter Todo");
        }
        userTodo.current.value = null;
        getData();
        setloading(false);
    }
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input onKeyPress={handleKeyPress} autoFocus type="text" ref={userTodo} style={{ flex: "70%", borderRadius: "10px", height: "30px" }} />
            <button style={{ flex: 1,backgroundColor:"#2ecc71", borderRadius: "10px", height: "40px", border: "none", cursor: "pointer" }} disabled={loading} onClick={handleSubmit}>{loading ? "Loading" : "Save Todo"}</button>
        </div>
    )
}
export default EnterTodo