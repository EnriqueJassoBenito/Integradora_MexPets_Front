import axios from "axios";

let lc = 'localhost:8080'

let url_api_adoption = `http://${lc}/api/adoption/`

const onGetAllAdoption = async () => {
    try {
        const response = await axios.get(url_api_adoption);
        console.log(response.data)
        return response.data.data;
    } catch (error) {
        throw(error)
    }
}