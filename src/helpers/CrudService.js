import axios from "axios";

const getItems = async (url) => {
  const res = await axios.get(url);
  return res;
};
const postItems = async (url, data) => {
  const res = await axios.post(url, data);
  return res;
};

const putItems = async (url, data) => {
  const res = await axios.put(url, data);
  return res;
};

const deleteItems = async (url) => {
  const res = await axios.delete(url);
  return res;
};

const CRUDservice = { getItems, postItems, deleteItems, putItems };

export default CRUDservice;
