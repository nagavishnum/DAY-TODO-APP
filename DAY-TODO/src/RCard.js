import { useCallback } from "react";
import "./tasks.css";

const RCard = ({ getData, status, data, totalData, date, setData }) => {
    const dateDiffCalc = useCallback(async () => {
        const fullData = localStorage.getItem("userTodo");
        const parsedData = JSON.parse(fullData);
        if (parsedData) {
            const filterDate = parsedData[0]?.date;
            const cDate = new Date(date);
            const oDate = new Date(filterDate);
            const differenceMs = Math.abs(cDate - oDate);
            const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
            const totalTodo = parsedData?.length;
            const doneTodo = await parsedData.filter((y) => y.status === "done");
            const doneLength = doneTodo?.length;
            const percent = localStorage.getItem("percent");
            const obj2 = { date: date, percentage: doneLength ? ((doneLength / totalTodo) * 100) : 0 }
            let filteredpercent;
            if (percent) {
                const parsedpercent = JSON.parse(percent);
                filteredpercent = await parsedpercent.filter((x) => x.date !== date);
                await filteredpercent.push(obj2);
            }
            else {
                filteredpercent = [obj2];
            }
            const jsonString = JSON.stringify(filteredpercent);
            localStorage.setItem("percent", jsonString);
            setData((x) => ({ ...x, percent: filteredpercent }));
            if (differenceDays > 1) {

                localStorage.setItem("userTodo", []);

            }
        }
    }, [setData, date]);
    const handleDone = async (value) => {
        const remainingdata = await totalData.filter((x) => x.id !== value.id);
        const obj1 = { ...value, status: "done" };
        await remainingdata.push(obj1);
        const jsonString = JSON.stringify(remainingdata);
        localStorage.setItem("userTodo", jsonString);
        await getData();
        dateDiffCalc();
    }
    const handleNext = async (value) => {
        const remainingdata = await totalData.filter((x) => x.id !== value.id);
        const obj1 = { ...value, status: "ongoing" };
        await remainingdata.push(obj1);
        const jsonString = JSON.stringify(remainingdata);
        localStorage.setItem("userTodo", jsonString);
        await getData();
        dateDiffCalc();
    }
    const handleBack = async (value) => {
        const remainingdata = await totalData.filter((x) => x.id !== value.id);
        const obj1 = { ...value, status: "pending" };
        await remainingdata.push(obj1);
        const jsonString = JSON.stringify(remainingdata);
        localStorage.setItem("userTodo", jsonString);
        await getData();
        dateDiffCalc();
    }

    const handleDelete = async (value) => {
        const remainingdata = await totalData.filter((x) => x.id !== value.id);
        const jsonString = JSON.stringify(remainingdata);
        localStorage.setItem("userTodo", jsonString);
        const ids = localStorage.getItem("ids");
        const parsedids = JSON.parse(ids);
        const filterremainingids = await parsedids.filter((x) => x !== value.id);
        const jsonids = JSON.stringify(filterremainingids);
        localStorage.setItem("ids", jsonids);
        await getData();
        dateDiffCalc();
    }
    return (
        <div className="task-viewer" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <h5 style={{ textAlign: "center" }}>{status}</h5>
            {
                data && data.map((value) => (
                    <div className="task" key={value.id} style={{ display: "flex", gap: "5px" }}>
                        <li key={value.id} className="task-title"  style={{ wordWrap: "break-word" }}>{value.name}</li>
                        {status !== "DONE" && <button style={{ height: "25px", backgroundColor: "#95a5a6", border: "none" }} onClick={() => handleDone(value)}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 50 50">
                            <path fill="none" stroke="black" strokeWidth="5" d="M5 25l15 15L45 5" />
                        </svg>
                        </button>}{status === "PENDING" &&
                            <button style={{ height: "25px", backgroundColor: "#95a5a6", border: "none" }} onClick={() => handleNext(value)}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                <path d="M5 12h12M12 5l7 7-7 7" stroke="#000" strokeWidth="2" fill="none" />
                            </svg>
                            </button>}
                        {status !== "PENDING" &&
                            <button style={{ height: "25px", backgroundColor: "#95a5a6", border: "none" }} onClick={() => handleBack(value)}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                <path d="M20 11H7.83l5.59-5.59-1.41-1.41-8 8 8 8 1.41-1.41L7.83 13H20z" />
                            </svg>

                            </button>}

                        <button style={{ height: "25px", backgroundColor: "#95a5a6", border: "none" }} onClick={() => handleDelete(value)}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                        </button>
                    </div>
                ))
            }
        </div >
    );
}

export default RCard