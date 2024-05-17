import RCard from "./RCard";

const Todos = ({ todos, getData ,loading}) => {

    return ( loading ? "LOADING ...." :
        <div style={{ display: "flex", justifyContent: "space-evenly", gap: "10px" }}>
            <RCard status="PENDING" todos={todos?.pendingTodos} getData={getData} />
            <RCard status="ONGOING" todos={todos?.ongoingTodos} getData={getData} />
            <RCard status="DONE" todos={todos?.doneTodos} getData={getData} />
        </div >
    )
}
export default Todos