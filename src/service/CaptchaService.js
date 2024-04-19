import axios from "axios";

const API_URL = "http://localhost:8080/api/captcha/verify-captcha";

const CaptchaService = {
  verifyCaptcha(solution) {
    return axios
      .post(API_URL + "?solution=" + solution)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};

export default CaptchaService;
