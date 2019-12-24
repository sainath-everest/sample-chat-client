import axios from 'axios';

export const registration = async (user) => {
    return await axios.post('https://a45a53d7.ngrok.io/registration',user);
}