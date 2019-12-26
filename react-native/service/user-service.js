import axios from 'axios';

export const registration = async (user) => {
    return await axios.post('http://192.168.0.50:8000/registration',user);
}
export const registration = async (user) => {
    return await axios.post('http://192.168.0.50:8000/signin',user);
}