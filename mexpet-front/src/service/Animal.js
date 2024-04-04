import axios from "axios";

let lc = 'localhost:8080'

let url_api_animal = `http://${lc}/api/animals/`

const onGetAllAnimals= async () => {
    try {
        const response = await axios.get(url_api_animal);
        console.log(response.data)
        return response.data.data;
    } catch (error) {
        throw(error)
    }
}