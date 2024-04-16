import axios from "axios";
const baseUrl = "http://localhost:8080/api/";


export const changePassword = async (email) => {
    const url = `${baseUrl}auth/reset-password`;
    try {
        const response = await axios.post(url, {
            email: email,
        });
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud de envio de email :", error);

        throw new Error("Error en la solicitud de login");
    }
};

export const changePasswordConfirm = async (
    token,
    password,
    confirmPassword
) => {
    const url = `${baseUrl}auth/reset-password/confirm`;
    try {
        const response = await axios.post(url, {
            token: token,
            password: password,
            confirmPassword: confirmPassword,
        });
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud cambio de contraseña :", error);

        throw new Error("Error en la solicitud de cambio de contraseña");
    }
};

export default {
    changePassword,
    changePasswordConfirm
}
