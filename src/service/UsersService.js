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

const getActiveUsers = async () => {
    try {
        const response = await axios.get(`${baseUrl}active`);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

const getInactiveUsers = async () => {
    try {
        const response = await axios.get(`${baseUrl}inactive`);
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

const getUsersByAdminAndModeratorRoles = async () => {
    try {
        const response = await axios.get(`${baseUrl}roles/admin-moderador`);
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

const changeUserStatus = async (id, newStatus) => {
    try {
        const response = await axios.patch(`${baseUrl}${id}`, { status: newStatus });
        return response.data.data;
    } catch (error) {
        throw error;
    }
};


export default {
    getAllUsers,
    getActiveUsers,
    getInactiveUsers,
    getUsersByRole,
    getUsersByAdminAndModeratorRoles,
    insertUser,
    updateUser,
    changeUserStatus
};

