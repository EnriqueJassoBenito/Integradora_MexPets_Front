import axios from "axios";

let lc = 'localhost:8080'

let api_adoptionprocessed = `http://${lc}/api/adoption_processed/`

const onGetAllAdoptionProcessed = async () => {
    try {
        const response = await axios.get(api_adoptionprocessed);
        console.log(response.data)
        return response.data.data;
    } catch (error) {
        throw(error)
    }
}