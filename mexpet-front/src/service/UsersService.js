import axios from "axios";

let lc = 'localhost:8080'

let url_api_user = `http://${lc}/api/user/`

const onGetAllUsers = async () => {
    try {
        const response = await axios.get(url_api_user);
        console.log(response.data)
        return response.data.data;
    } catch (error) {
        throw(error)
    }
}


