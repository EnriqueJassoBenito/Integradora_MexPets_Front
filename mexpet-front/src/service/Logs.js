import axios from "axios";

let lc = 'localhost:8080'

let url_api_logs = `http://${lc}/api/logs/`

const onGetLogs = async () => {
    try {
        const response = await axios.get(url_api_logs);
        console.log(response.data)
        return response.data.data;
    } catch (error) {
        throw(error)
    }
}