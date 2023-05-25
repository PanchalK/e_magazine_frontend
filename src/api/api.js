import axios from "axios";

const usersUrl = "http://localhost:8000";

export const getAdmin = async (creds) => {
  try {
    const obj = {
      url: `${usersUrl}/getadmin`,
      method: "POST",
      data: creds,
    };
    const result = await axios(obj);
    return {
      success: true,
      data: result.data.value,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const getEditor = async (creds) => {
  try {
    const obj = {
      url: `${usersUrl}/geteditor`,
      method: "POST",
      data: creds,
    };
    const result = await axios(obj);
    return {
      success: true,
      data: result.data.value,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const getArticles = async () => {
  try {
    const obj = {
      url: `${usersUrl}/getarticles`,
      method: "GET",
    };
    const result = await axios(obj);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const addArticle = async (article) => {
  try {
    const obj = {
      url: `${usersUrl}/addarticle`,
      method: "POST",
      data: article,
    };
    const result = await axios(obj);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const editArticle = async (id, article) => {
  try {
    const obj = {
      url: `${usersUrl}/updatearticle/${id}`,
      method: "PUT",
      data: article,
    };
    const result = await axios(obj);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const editArticleApproval = async (id) => {
  return await axios.put(`${usersUrl}/updatearticleapproval/${id}`);
};

export const addEditor = async (editor) => {
  try {
    const obj = {
      url: `${usersUrl}/addeditor`,
      method: "POST",
      data: editor,
    };
    const result = await axios(obj);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const addAdmin = async (admin) => {
  try {
    const obj = {
      url: `${usersUrl}/addadmin`,
      method: "POST",
      data: admin,
    };
    const result = await axios(obj);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const getMessage = async (desig) => {
  try {
    const obj = {
      url: `${usersUrl}/getmessage`,
      method: "POST",
      data: desig,
    };
    const result = await axios(obj);
    return {
      success: true,
      data: result.data.value,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const getEditors = async () => {
  try {
    const obj = {
      url: `${usersUrl}/geteditors`,
      method: "GET",
    };
    const result = await axios(obj);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const addMagazine = async (magazine) => {
  try {
    const obj = {
      url: `${usersUrl}/addmagazine`,
      method: "POST",
      data: magazine,
    };
    const result = await axios(obj);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const editMagazine = async (id) => {
  return await axios.put(`${usersUrl}/updatemagazine/${id}`);
};

export const getMagazines = async () => {
  try {
    const obj = {
      url: `${usersUrl}/getmagazines`,
      method: "GET",
    };
    const result = await axios(obj);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const getPlacements = async () => {
  try {
    const obj = {
      url: `${usersUrl}/getplacements`,
      method: "GET",
    };
    const result = await axios(obj);
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const addPlacement = async (placementdata) => {
  try {
    const obj = {
      url: `${usersUrl}/addplacement`,
      method: "POST",
      data: placementdata,
    };
    const result = await axios(obj);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const deletePlacement = async (id) => {
  return await axios.delete(`${usersUrl}/deleteplacement/${id}`);
};

export const deleteMagazine = async (id) => {
  return await axios.delete(`${usersUrl}/deletemagazine/${id}`);
};

export const deleteEditor = async (id) => {
  return await axios.delete(`${usersUrl}/deleteeditor/${id}`);
};

export const deleteArticle = async (id) => {
  return await axios.delete(`${usersUrl}/deletearticle/${id}`);
};