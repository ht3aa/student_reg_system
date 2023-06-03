import axios from "axios";
import { useEffect, useState } from "react";
import CardsTemplate from "../../../../templates/CardsTemplate/CardsTemplate";
import CreateBox from "../../../../templates/createBox/CreateBox";


const Students = ({ batchUid }) => {
    const [students, setStudnets] = useState(null);
    const [studentsKyes, setstudentsKeys] = useState(null);
    useEffect(() => {
        async function getData() {
            const { data: departmentsData }  = await axios.get(`/batch/${batchUid}/getStudents`);
            setStudnets(departmentsData)
        }
        getData();

    }, [batchUid])

    useEffect(() => {
        students ? setstudentsKeys(Object.keys(students)) : setstudentsKeys(null);
    }, [students]);

    return (
        <section className="containerForData">
            <CreateBox heading={"Add New Student"} buttonText={"Add"} action={`batch/${batchUid}/AddNewStudent`} title="Choose student"/>
            <main className="cardDataContainer">
                {studentsKyes && studentsKyes.map((item) => {
                    return <CardsTemplate action="student" uid={students[`${item}`]._id} data={students[`${item}`]} key={students[`${item}`]._id} related_batch={batchUid}/>
                })}
            </main>
        </section>
    )
}


export default Students;