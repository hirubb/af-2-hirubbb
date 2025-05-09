import axios from 'axios';
const USER_URL = 'http://localhost:9000/api/users';


export const registerUser = async (formData) => {
    try {
      const response = await axios.post(`${USER_URL}/register`,formData);
      return response;
    } catch (error) {
      console.error('Error registering', error);
      throw error;
    }
  };

  export const login = async (email, password) => {
    try {
      const response = await axios.post(`${USER_URL}/login`, { email, password });
      return response;
    } catch (error) {
      console.error("Error Login user", error);
      throw error;
    }
  };

  export const myDetails = async ()=>{
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${USER_URL}/me`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response;
    }catch(error){
      console.error("Error Fetching User", error);
      throw error;
    }
  }

  export const updateUser = async (field, value) => {
    const token = localStorage.getItem('token');
    return axios.put(
      `${USER_URL}/edit`,
      { [field.toLowerCase()]: value },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };