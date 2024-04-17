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
        const response = await axios.get(`${url_api_processed}${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onCreateProcessed = async (processedData) => {
    try {
        const response = await axios.post(`${url_api_processed}process`, processedData);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onUpdateProcessed = async (id, updatedData) => {
    try {
        const response = await axios.put(`${url_api_processed}${id}`, updatedData);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onUpdateApprovalStatus = async (id, status) => {
    try {
        const response = await axios.patch(`${url_api_processed}${id}/updateApprovalStatus?status=${status}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onDeleteProcessed = async (id) => {
    try {
        const response = await axios.delete(`${url_api_processed}${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export default {
    onGetAllProcessed,
    onGetProcessedById,
    onCreateProcessed,
    onUpdateProcessed,
    onUpdateApprovalStatus,
    onDeleteProcessed
};
