import axios from "axios";

let lc = 'localhost:8080';
const url_api_animals = `http://${lc}/api/animals/`;

const onGetAllAnimals = async () => {
    try {
        const response = await axios.get(`${url_api_animals}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetAnimalById = async (id) => {
    try {
        const response = await axios.get(`${url_api_animals}/${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetAnimalsByTypePet = async (typePetId) => {
    try {
        const response = await axios.get(`${url_api_animals}/type/${typePetId}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetAnimalsByRace = async (raceId) => {
    try {
        const response = await axios.get(`${url_api_animals}/race/${raceId}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetAnimalsByPersonality = async (personalityId) => {
    try {
        const response = await axios.get(`${url_api_animals}/personality/${personalityId}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetFemaleAnimals = async () => {
    try {
        const response = await axios.get(`${url_api_animals}/female`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetMaleAnimals = async () => {
    try {
        const response = await axios.get(`${url_api_animals}/male`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetPendingApprovalAnimals = async () => {
    try {
        const response = await axios.get(`${url_api_animals}/pending-approval`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetApprovedAnimals = async () => {
    try {
        const response = await axios.get(`${url_api_animals}/approved`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onInsertAnimal = async (animalDto, imageFiles) => {
    try {
        const formData = new FormData();
        formData.append('dto', JSON.stringify(animalDto));
        imageFiles.forEach((file) => {
            formData.append('imageFiles', file);
        });
        const response = await axios.post(`${url_api_animals}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onUpdateAnimal = async (id, animalDto) => {
    try {
        const response = await axios.put(`${url_api_animals}/${id}`, animalDto);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onApproveOrRejectAnimal = async (id, approvalStatus, moderatorComment) => {
    try {
        const response = await axios.patch(`${url_api_animals}/${id}/approval`, null, {
            params: {
                approvalStatus: approvalStatus,
                comment: moderatorComment
            }
        });
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onDeleteAnimal = async (id) => {
    try {
        const response = await axios.delete(`${url_api_animals}/${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export default {
    onGetAllAnimals,
    onGetAnimalById,
    onGetAnimalsByTypePet,
    onGetAnimalsByRace,
    onGetAnimalsByPersonality,
    onGetFemaleAnimals,
    onGetMaleAnimals,
    onGetPendingApprovalAnimals,
    onGetApprovedAnimals,
    onInsertAnimal,
    onUpdateAnimal,
    onApproveOrRejectAnimal,
    onDeleteAnimal
};