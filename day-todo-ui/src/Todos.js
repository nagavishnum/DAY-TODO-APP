import RCard from "./RCard";

const Todos = ({ todos ,loading}) => {

    return ( loading ? "LOADING ...." :
        <div style={{ display: "flex", justifyContent: "space-evenly", gap: "10px" }}>
            <RCard status="PENDING" todos={todos?.pendingTodos} />
            <RCard status="ONGOING" todos={todos?.ongoingTodos} />
            <RCard status="DONE" todos={todos?.doneTodos} />
            <RCard status="FILTER BY" filter="true"/>
        </div >
    )
}
export default Todos