import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useLoadMore = function (url, params) {
  const queryKey = [url, params];
  const queryFn = ({ pageParam = 1 }) => fetcher({ queryKey, page: pageParam });

  const context = useInfiniteQuery(queryKey, queryFn, {
    getPreviousPageParam: (firstPage) => firstPage.previousPage ?? false,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? false;
    },
  });

  return context;
};

export const fetcher = async function ({ queryKey , page}) {
  const [url, params] = queryKey;
  return axios
    .get(url, {
      params: { _page: page, _sort: "title", _limit: 2 },
    })
    .then((res) => {
      const hasNext = page * 2 <= parseInt(res.headers["x-total-count"]);
      return {
        nextPage: hasNext ? page + 1 : undefined,
        previousPage: page > 1 ? page - 1 : undefined,
        posts: res.data,
      };
    });
};
