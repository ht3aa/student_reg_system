import CreateBox from "../../../../templates/createBox/CreateBox";
import CardsTemplate from "../../../../templates/CardsTemplate/CardsTemplate";
import { useEffect, useState } from "react";
import axios from "axios";

const Departments = () => {
    const [departmentsKeys, setDepartmentsKeys]= useState(null);
    const [departments, setDepartments] = useState(null);
    useEffect(() => {
        async function getData() {
            const { data: departmentsData }  = await axios.get("/getDepartments");
            setDepartments(departmentsData);
        }
        getData();

    }, [])

    useEffect(() => {
        departments ? setDepartmentsKeys(Object.keys(departments)) : setDepartmentsKeys(null);
    }, [departments]);

    return (
        <section className="containerForData">
            <CreateBox heading={"Create New Department"} buttonText={"Create"} action="createNewDepartment" title="Choose department" />
            <main className="cardDataContainer">
                {departmentsKeys && departmentsKeys.map((item) => {
                    return <CardsTemplate action="department" uid={departments[`${item}`]._id} data={departments[`${item}`]} key={departments[`${item}`]._id}/>
                })}
            </main>
        </section>
    )
}


export default Departments;