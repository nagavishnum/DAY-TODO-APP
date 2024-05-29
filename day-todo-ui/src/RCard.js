import "./tasks.css";
import { CiBookmark } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import { GrFormNextLink } from "react-icons/gr";
import { IoArrowBack } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { getDatabyDate } from "./redux/Actions";
import { useDispatch } from "react-redux";


const RCard = ({ status, todos, filter }) => {

    const [loading, setloading] = useState(false);
    const [filterForm, setFilterForm] = useState({
        filterDate: '',
        filterpriority: '',
        filterdue: ''
    });
    const {filterDate} = filterForm;

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFilterForm((form) => ({
            ...form,
            [id]: value
        }));
    }

    const handleFilter = async () => {
        setloading(true);
        dispatch(getDatabyDate(filterDate));
        setloading(false);
    }

    const handleStatus = async (value, type) => {
        const obj1 = { id: value.id, status: type };
        const res = await fetch("http://localhost:8081/updateTodoStatus", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj1)
        });
        if ([200, 201].includes(res.status)) {
            dispatch(getDatabyDate());

        }
        else {
            window.alert(res.statusText);
        }
    }
    const handleDelete = async (value) => {
        const res = await fetch(`http://localhost:8081/deleteTodo/${value.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });
        if ([200, 201].includes(res.status)) {
            dispatch(getDatabyDate());
        }
        else {
            window.alert(res.statusText);
        }
    }
    return (
        <div className="task-viewer" style={{ display: "flex", flexDirection: "column", gap: "10px", borderColor: status === "PENDING" ? "#FFFF00" : status === "ONGOING" ? "#4169E1" : status === "DONE" ? "#228B22" : 'black' }}>
            <h5 style={{ textAlign: "center" }}>{status}</h5>
            {
                todos && todos.map((value) => (
                    <div className="task" key={value.id} style={{ display: "flex", gap: "5px", alignItems: "center", justifyContent: "space-between" }}>
                        <CiBookmark style={{ color: value.priority === 'High' ? '#FF5733' : value.priority === 'Medium' ? '#FFD700' : '#228B22' }} />
                        <p key={value.id} className="task-title" style={{ wordWrap: "break-word" }}>{value.todo}</p>
                        {status !== "DONE" && <MdDone style={{ color: "#228B22", cursor: "pointer" }} onClick={() => handleStatus(value, "DONE")} />}
                        {status === "PENDING" && <GrFormNextLink style={{ color: "#4169E1", cursor: "pointer" }} onClick={() => handleStatus(value, "ONGOING")} />}
                        {status !== "PENDING" && <IoArrowBack style={{ color: "#FFFF00", cursor: "pointer" }} onClick={() => handleStatus(value, "PENDING")} />}
                        <RxCross2 style={{ cursor: "pointer" }} onClick={() => handleDelete(value)} />
                    </div>
                ))
            }
            {
                filter && (
                    <div style={{ display: "flex", flexDirection: 'column', gap: "10px" }}>
                        <input type="date" id="filterDate" onChange={handleChange} value={filterForm.filterDate} />
                        <select id="filterpriority" onChange={handleChange} onSelect={handleChange} value={filterForm.filterpriority}>
                            <option value="">Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <button style={{ backgroundColor: "#2ecc71", borderRadius: "10px", height: "40px", border: "none", cursor: "pointer", width: "300px" }} disabled={loading} onClick={handleFilter}>
                            {loading ? "Loading" : "Filter"}
                        </button>
                    </div>
                )
            }
        </div >
    );
}

export default RCard