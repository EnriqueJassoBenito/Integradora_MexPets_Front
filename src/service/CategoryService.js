import axios from "axios";

let lc = 'localhost:8080'

let url_api_race = `http://${lc}/api/race/`
let url_api_personality = `http://${lc}/api/personality/`
let url_api_type = `http://${lc}/api/type-pet/`

const onInsertRace = async (racePet) => {
    try {
        const response = await axios.post(url_api_race, {
            racePet: racePet
        });
    } catch (error) {
        throw error;
    }
}

const onGetAllRace = async () => {
    try {
        const response = await axios.get(url_api_race);
        return response.data.data;
    } catch (error) {
        throw(error)
    }
}

const onUpdateRace = async (id, racePet) => {
    try {
        const response = await axios.put(`${url_api_race}${id}`, {
            id,
            racePet
        });
        console.log(response.data);
    } catch (error) {
        throw(error);
    }
};

const onDeleteRace = async (id) => {
    try {
        const response = await axios.delete(`${url_api_race}${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const onInsertPersonality = async (personalityPet)=> {
    try {
        const response = await axios.post(url_api_personality,{
            personalityPet: personalityPet
        });
    } catch (error) {
        throw("Error", error);
    }
}

const onGetAllPersonality = async () => {
    try {
        const response = await axios.get(url_api_personality);
        return response.data.data;
    } catch (error) {
        throw(error)
    }
};

const onUpdatePersonality = async (id, personalityPet) => {
    try {
        const response = await axios.put(`${url_api_personality}${id}`, {
            id,
            personalityPet
        });
        return response.data;
    } catch (error) {
        throw(error);
    }
}

const onDeletePersonality = async (id) => {
    try {
        const response = await axios.delete(`${url_api_personality}${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const onInsertTypePet = async (type)=> {
    try {
        const response = await axios.post(url_api_type,{
            type: type
        });
    } catch (error) {
        throw("Error", error);
    }
}

const onGetAllType = async () =>{
    try {
        const response = await axios.get(url_api_type);
        return response.data.data;
    } catch (error) {
        throw(error)
    }
}
const onGetAllTypeRegister = async () =>{
    try {
        const response = await axios.get(url_api_type);
        return response.data.data.map(types => types.type);
    } catch (error) {
        throw(error)
    }
}
const onGetAllPersonalityRegister = async () => {
    try {
        const response = await axios.get(url_api_personality);
        return response.data.data.map(personalities => personalities.personalityPet);
    } catch (error) {
        throw(error)
    }
};
const onGetAllRaceRegister = async () => {
    try {
        const response = await axios.get(url_api_race);
        return response.data.data.map(races => races.racePet);
    } catch (error) {
        throw(error)
    }
}
const onUpdateType = async (id, type) => {
    try {
        const response = await axios.put(`${url_api_type}${id}`, {
            id,
            type
        });
        return response.data;
    } catch (error) {
        throw(error);
    }
}

const onDeleteType = async (id) => {
    try {
        const response = await axios.delete(`${url_api_type}${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default{
    onInsertRace,
    onGetAllRace,
    onUpdateRace,
    onDeleteRace,

    onInsertPersonality,
    onGetAllPersonality,
    onUpdatePersonality,
    onDeletePersonality,

    onGetAllType,
    onInsertTypePet,
    onUpdateType,
    onDeleteType,
    onGetAllTypeRegister,
    onGetAllPersonalityRegister,
    onGetAllRaceRegister
}

