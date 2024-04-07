import axios from "axios";

let lc = 'localhost:8080';
let api_adoptionprocessed = `http://${lc}/api/adoption-processed/`;

const onGetAllAdoptionProcessed = async () => {
    try {
        const response = await axios.get(api_adoptionprocessed);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onAcceptAdoption = async (adoptionId) => {
    try {
        const response = await axios.post(`${api_adoptionprocessed}acceptAdoption?adoptionId=${adoptionId}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onUpdateProcessed = async (id, processedData) => {
    try {
        const response = await axios.put(`${api_adoptionprocessed}${id}`, processedData);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onChangeStatus = async (id, processedData) => {
    try {
        const response = await axios.patch(`${api_adoptionprocessed}${id}`, processedData);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onDeleteProcessed = async (id) => {
    try {
        const response = await axios.delete(`${api_adoptionprocessed}${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export default {
    onGetAllAdoptionProcessed,
    onAcceptAdoption,
    onUpdateProcessed,
    onChangeStatus,
    onDeleteProcessed
};
