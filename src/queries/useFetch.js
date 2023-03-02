import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../services/apiService";

export const useFetch = function (url, params, config) {
  const queryKey = [url, params];
  const queryFn = () => getData(url, params);

  const context = useQuery(queryKey, queryFn, {
    enabled: !!url,
    ...config,
  });

  return context;
};

