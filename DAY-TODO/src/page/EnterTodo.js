import { useCallback, useEffect, useRef, useState } from "react"

const EnterTodo = ({ getData ,getDate,date}) => {
    const userTodo = useRef(null);
    const [loading, setloading] = useState(false);

    const dateDiffCalc = useCallback(async () => {
        const data = localStorage.getItem("userTodo");
        if (data) {
            const parsedData = await JSON.parse(data);
            const filterDate = parsedData[0]?.date;
            const cDate = new Date(date);
            const oDate = new Date(filterDate);
            const differenceMs = Math.abs(cDate - oDate);
            const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
            const totalTodo = parsedData.length;
            const doneTodo = parsedData.filter((y) => y.status === "done");
            const doneLength = doneTodo ? doneTodo.length : 0;
            const percent = localStorage.getItem("percent");
            const obj2 = { date: date, percentage: doneLength > 0 ? (doneLength / totalTodo) * 100 : 0 }
            let filteredpercent;
            if (percent) {
                const parsedpercent = JSON.parse(percent);
                filteredpercent = parsedpercent.filter((x) => x.date !== date);
                filteredpercent.push(obj2);
            }
            else {
                filteredpercent = [obj2];
            }
            const jsonString = JSON.stringify(filteredpercent);
            localStorage.setItem("percent", jsonString);
            if (differenceDays >= 1) {

                localStorage.setItem("userTodo", []);
                localStorage.setItem("ids", []);

            }
        }
    }, [date]);


    useEffect(() => {
        const data = localStorage.getItem("userTodo");
        const ids = localStorage.getItem("ids");
        const percent = localStorage.getItem("percent");
        if (!data) {
            localStorage.setItem("userTodo", []);
        }
        if (!ids) {
            localStorage.setItem("ids", []);
        }
        if (!percent) {
            localStorage.setItem("percent", []);
        }
        getDate();
    }, []);

    const getRandomNumber = (range) => {
        //floor rounds the decimal off
        //random gives decimal value b/w 0 &1
        return Math.floor(Math.random() * range) + 1;
    };

    const storeids = async (obj1) => {
        const getids = localStorage.getItem("ids");
        if (getids) {
            const retrievedids = JSON.parse(getids);
            retrievedids.push(obj1.id);
            const jsonString = JSON.stringify(retrievedids);
            localStorage.setItem("ids", jsonString);
        }
        else {
            const data = [obj1.id];
            const jsonString = JSON.stringify(data);
            localStorage.setItem("ids", jsonString);
        }
    }
    const storeData = async (obj1) => {
        const getData = localStorage.getItem("userTodo");
        if (getData) {
            //localS can only store strings so stringify and parse
            const retrievedArray = JSON.parse(getData);
            retrievedArray.push(obj1);
            const jsonString = JSON.stringify(retrievedArray);
            localStorage.setItem("userTodo", jsonString);
        }
        else {
            const data = [obj1];
            const jsonString = JSON.stringify(data);
            localStorage.setItem("userTodo", jsonString);
        }
    }

    const checkid = async () => {
        let status = true;
        let randomNumber;
        let range = 500;
        while (status) {
            randomNumber = getRandomNumber(range);

            range++;
            const item = localStorage.getItem("ids");
            item && JSON.parse(item);
            if (item && item.includes(randomNumber)) {
                status = true;
            }
            else {
                status = false;
            }
        }
        return randomNumber;
    }
    const handleSubmit = async () => {
        if (userTodo.current.value) {
            setloading(true);
            const obj1 = {
                name: userTodo.current.value,
                date: date,
            }
            const res = fetch("/saveTodo", {
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