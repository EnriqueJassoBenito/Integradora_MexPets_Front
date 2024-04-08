import axios from "axios";

let lc = 'localhost:8080';
let url_api_adoption = `http://${lc}/api/adoption/`;

const onGetAllAdoption = async () => {
    try {
        const response = await axios.get(`${url_api_adoption}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onInsertAdoption = async (adoptionDto, imageFiles) => {
    try {
        const formData = new FormData();
        formData.append('dto', JSON.stringify(adoptionDto));
        imageFiles.forEach((file) => {
            formData.append('imageFiles', file);
        });
        const response = await axios.post(`${url_api_adoption}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const onUpdateAdoption = async (id, adoptionDto) => {
    try {
        const response = await axios.put(`${url_api_adoption}/${id}`, adoptionDto);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const onDeleteAdoption = async (id) => {
    try {
        const response = await axios.delete(`${url_api_adoption}/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default {
    onGetAllAdoption,
    onInsertAdoption,
    onUpdateAdoption,
    onDeleteAdoption
};
