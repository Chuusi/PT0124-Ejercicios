import { updateToken } from "../utils";
import { APIuser } from "./serviceApiUser.config";

//! ----------------- REGISTER -----------------------------

export const registerUser = async (formData) => {
    return APIuser.post("/users/registroUser", formData, {
        headers: { "Content-Type ": "multipart/form-data" },
    })
        .then((res) => res)
        .catch((error) => error);
};

//! ----------------- LOGIN ---------------------------------

export const loginUserService = async (formData) => {
    return APIuser.post("/users/login", formData)
        .then((res) => res)
        .catch((error) => error);
};

//! ---------------- CHECK CODE -----------------------------

export const checkCodeConfirmationUser = async (formData) => {
    return APIuser.patch("/users/checkCC", formData)
        .then((res) => res)
        .catch((error) => error);
};

//! ----------------- RESEND CODE ---------------------------

export const resendCodeConfirmationUser = async (formData) => {
    return APIuser.patch("/users/reenviarCodigo", formData)
        .then((res) => res)
        .catch((error) => error);
};

//! ----------------- AUTOLOGIN -----------------------------

export const autoLoginUser = async (formData) => {
    return APIuser.post("/users/autoLogin", formData)
        .then((res) => res)
        .catch((error) => error);
};

//! ----------------- FORGOTTEN PASS ------------------------

export const forgotPasswordUser = async (formData) => {
    return APIuser.patch("/users/forgotPassword", formData)
        .then((res) => res)
        .catch((error) => error);
};

//! ----------------- DELETE USER ---------------------------

export const deleteUserService = async () => {
    return APIuser.delete("/users/deleteUser", {
        headers: {
            Authorization: `Bearer ${updateToken()}`,
        },
    })
        .then((res) => res)
        .catch((error) => error);
};

//! ---------------- CAMBIO PASSWORD LOGUEADO ---------------

export const changePasswordUserToken = async (formData) => {
    return APIuser.patch("/users/changePassword", formData, {
        headers: {
            Authorization: `Bearer ${updateToken()}`,
        },
    })
        .then((res) => res)
        .catch((error) => error);
};

//! ------------- MODIFICAR PERFIL --------------------------

export const updateUser = async (formData) => {
    return APIuser.patch("/users/update", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${updateToken()}`,
        },
    })
        .then((res) => res)
        .catch((error) => error);
};
