import axios from "axios";
import { getServerUrl } from "./getServerUrl";

export const api = axios.create({
  baseURL: getServerUrl(),
});
