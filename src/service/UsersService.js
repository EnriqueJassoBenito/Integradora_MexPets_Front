import axios from "axios";

const baseUrl = "http://localhost:8080/api/user/";

const getAllUsers = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

const getUsersByRole = async (roleName) => {
    try {
        const response = await axios.get(`${baseUrl}role/${roleName}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

const insertUser = async (userData) => {
    try {
        const response = await axios.post(baseUrl, userData);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${baseUrl}${userId}`, userData);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${baseUrl}${userId}`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export default {
    getAllUsers,
    getUsersByRole,
    insertUser,
    updateUser,
    deleteUser,
};

