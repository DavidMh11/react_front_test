import axios from "axios";
import type { Users } from "../../components/users/types/types";

// Definimos la URL base a utilizar, esto podría ser almacenado en una variable de entorno en caso de solo utilizar una API o definirla por archivo para usar una diferente en cada archivo.
const URL_API = "https://jsonplaceholder.typicode.com";

// Creamos una configuración axios global para poder usarla dentro de nuestro servicio de usuarios
const usersAxios = axios.create({
    baseURL: URL_API
});

// Definimos las funciones que obtendrán los datos a la API
export const getUsers = async (): Promise<Users[]> => {
    return (await usersAxios.get('/users')).data;
}

export const getUserById = async (id: number | string): Promise<Users> => {
    return (await usersAxios.get(`/users/${id}`)).data;
}