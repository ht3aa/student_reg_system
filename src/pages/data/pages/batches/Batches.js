import axios from "axios";
import { useEffect, useState } from "react";
import CardsTemplate from "../../../../templates/CardsTemplate/CardsTemplate";
import CreateBox from "../../../../templates/createBox/CreateBox";


const Batches = ({ departmentUid }) => {
    const [batches, setBatches] = useState(null);
    const [batchesKyes, setbatchesKeys] = useState(null);
    const [mount, setMount] = useState(false);
    useEffect(() => {
        setMount(true);
    }, [])

    useEffect(() => {        
        async function getData() {
            const { data: departmentsData }  = await axios.get(`/department/${departmentUid}/getBatches`);
            setBatches(departmentsData)
        }
        if(mount) getData();
    }, [departmentUid, mount])

    useEffect(() => {
        batches ? setbatchesKeys(Object.keys(batches)) : setbatchesKeys(null);
    }, [batches]);
    
    return (
        <section className="containerForData">
            <CreateBox heading={"Create New Batch"} buttonText={"Create"} action={`department/${departmentUid}/createNewBatch`} title="Choose a batch" />
            <main className="cardDataContainer">
                {batchesKyes && batchesKyes.map((item) => {
                    return <CardsTemplate action="batch" uid={batches[`${item}`]._id} data={batches[`${item}`]} key={batches[`${item}`]._id} related_department={departmentUid}/>
                })}
            </main>
        </section>
    )
}


export default Batches;