import axios from "axios";

const baseUrl = "http://localhost:8080/api/logs/";

const onGetLogs = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data.data;
    } catch (error) {
        throw(error)
    }
}

export default {
    onGetLogs
}