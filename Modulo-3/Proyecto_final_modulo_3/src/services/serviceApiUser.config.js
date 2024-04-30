import axios from "axios";
import { updateToken } from "../utils";

//! Headers del servicio

const APIHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${updateToken()}`,
};

//! Llamada al servicio, con la url del backend

export const APIuser = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: APIHeaders,
    timeout: 60000,
});
