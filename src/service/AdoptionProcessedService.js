import axios from "axios";

let lc = 'localhost:8080';
const url_api_processed = `http://${lc}/api/adoption_processed/`;

const onGetAllProcessed = async () => {
    try {
        const response = await axios.get(`${url_api_processed}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetProcessedById = async (id) => {
    try {
        const response = await axios.get(`${url_api_processed}/${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetAllActiveProcessed = async () => {
    try {
        const response = await axios.get(`${url_api_processed}/getActive`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetAllInactiveProcessed = async () => {
    try {
        const response = await axios.get(`${url_api_processed}/getAllInactive`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onAcceptAdoption = async (adoptionId) => {
    try {
        const response = await axios.post(`${url_api_processed}/acceptAdoption`, null, {
            params: {
                adoptionId: adoptionId
            }
        });
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onUpdateProcessed = async (id, processedDto) => {
    try {
        const response = await axios.put(`${url_api_processed}/${id}`, processedDto);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onEnableOrDisableProcessed = async (id) => {
    try {
        const response = await axios.patch(`${url_api_processed}/${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onDeleteProcessed = async (id) => {
    try {
        const response = await axios.delete(`${url_api_processed}/${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export default {
    onGetAllProcessed,
    onGetProcessedById,
    onGetAllActiveProcessed,
    onGetAllInactiveProcessed,
    onAcceptAdoption,
    onUpdateProcessed,
    onEnableOrDisableProcessed,
    onDeleteProcessed
};
