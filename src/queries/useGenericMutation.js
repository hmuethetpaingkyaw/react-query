import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendData } from "../services/apiService";

const useGenericMutation = (func, url, params, updater) => {
  const queryClient = useQueryClient();

  return useMutation(func, {
    onMutate: async (data) => {
      await queryClient.cancelQueries([url, params]);

      const previousData = queryClient.getQueryData([url, params]);

      queryClient.setQueryData([url, params], (oldData) => {
        return updater ? updater(oldData, data) : data;
      });

      return previousData;
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, _, context) => {
      queryClient.setQueryData([url, params], context);
    },

    onSettled: () => {
      queryClient.invalidateQueries([url, params]);
    },
  });
};

export const useDelete = function (url, params, updater) {
  return useGenericMutation(
    function (id) {
      return sendData(`${url}/${id}`, null, "DELETE");
    },
    url,
    params,
    updater
  );
};

export const usePost = function (url, params, updater) {
  return useGenericMutation(
    function (data) {
      return sendData(url, data);
    },
    url,
    params,
    updater
  );
};

export const useUpdate = function (url, params, updater) {
  return useGenericMutation(
    function (data) {
      return api.patch(url, data);
    },
    url,
    params,
    updater
  );
};
