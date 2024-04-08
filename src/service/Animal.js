import axios from "axios";

let lc = 'localhost:8080';
let url_api_animal = `http://${lc}/api/animals/`;

const onGetAllAnimals= async () => {
    try {
        const response = await axios.get(url_api_animal);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const getAnimalsByTypePet = async (typePetId) => {
    try {
        const response = await axios.get(`${url_api_animal}type/${typePetId}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const getAnimalsByRace = async (raceId) => {
    try {
        const response = await axios.get(`${url_api_animal}race/${raceId}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const getAnimalsByPersonality = async (personalityId) => {
    try {
        const response = await axios.get(`${url_api_animal}personality/${personalityId}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const getFemaleAnimals = async () => {
    try {
        const response = await axios.get(`${url_api_animal}female`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const getMaleAnimals = async () => {
    try {
        const response = await axios.get(`${url_api_animal}male`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export default {
    onGetAllAnimals,
    getAnimalsByTypePet,
    getAnimalsByRace,
    getAnimalsByPersonality,
    getFemaleAnimals,
    getMaleAnimals
};
