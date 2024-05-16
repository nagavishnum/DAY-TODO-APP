import RCard from "../RCard";

const Todos = ({ data, getData,setData ,date}) => {
   
    return (
        <div style={{ display: "flex", justifyContent: "space-evenly", gap: "10px" }}>
            <RCard status="PENDING" data={data?.pending} getData={getData} date={date} totalData={data?.all} setData={setData}/>
            <RCard status="ONGOING" data={data?.ongoing} getData={getData} date={date}  totalData={data?.all}  setData={setData}/>
            <RCard status="DONE" data={data?.done} getData={getData} date={date}  totalData={data?.all}  setData={setData}/>

        </div >
    )
}
export default Todos