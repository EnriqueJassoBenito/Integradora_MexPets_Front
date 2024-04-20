import axios from "axios";

let lc = 'localhost:8080';
const url_api_animals = `http://${lc}/api/animals/`;

const onGetAllAnimals = async () => {
    try {
        const response = await axios.get(`${url_api_animals}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetAnimalsByUser = async (userId) => {
    try {
        const response = await axios.get(`${url_api_animals}users/${userId}`);
        console.log(response)
        return response.data.data;
    } catch (error) {
        throw error;
    }
}


const onGetAnimalsByTypePet = async (typePetId) => {
    try {
        const response = await axios.get(`${url_api_animals}/type/${typePetId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetAnimalsByRace = async (raceId) => {
    try {
        const response = await axios.get(`${url_api_animals}/race/${raceId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetAnimalsByPersonality = async (personalityId) => {
    try {
        const response = await axios.get(`${url_api_animals}/personality/${personalityId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetFemaleAnimals = async () => {
    try {
        const response = await axios.get(`${url_api_animals}/female`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetMaleAnimals = async () => {
    try {
        const response = await axios.get(`${url_api_animals}/male`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetPendingApprovalAnimals = async () => {
    try {
        const response = await axios.get(`${url_api_animals}pending-approval`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onGetApprovedAnimals = async () => {
    try {
        const response = await axios.get(`${url_api_animals}approved`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const onInsertAnimal = async (animalDto, imageFiles) => {
    try {
        const formData = new FormData();
        Object.keys(animalDto).forEach(key => {
            formData.append(key, animalDto[key]);
        });

        imageFiles.forEach((file) => {
            formData.append('imageFiles', file);
        });

        console.log("Contenido de formData:");
        for (const entry of formData.entries()) {
            console.log(entry[0] + ': ' + entry[1]);
        }

        const response = await axios.post(`${url_api_animals}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        console.log("Respuesta del servidor:", response.data);
        
        return response.data.data;
    } catch (error) {
        throw error;
    }
}


const onUpdateAnimal = async (id, animalDto, imageFiles) => {
    try {
        const formData = new FormData();
        formData.append("animalDto", JSON.stringify(animalDto));
        imageFiles.forEach((file) => {
            formData.append("imageFiles", file);
        });

        const response = await axios.put(`${url_api_animals}${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


const onApproveOrRejectAnimal = async (id, approvalStatus, moderatorComment) => {
    try {
        const response = await axios.patch(`${url_api_animals}${id}/approval`, null, {
            params: {
                approvalStatus: approvalStatus,
            moderatorComment: moderatorComment
            }
        });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}


const onDeleteAnimal = async (id) => {
    try {
        const response = await axios.delete(`${url_api_animals}/${id}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export default {
    onGetAllAnimals,
    onGetAnimalsByUser,
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
