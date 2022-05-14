import { useEffect, useState } from "react";
import axios from "axios";

export default function usePaginate(searchQueryInput, pageNumber) {
  const [paginate, setPaginate] = useState({
    loading: true,
    error: false,
    workouts: [],
    hasMore: false,
  });

  const getData = async () => {
    setPaginate({
      ...paginate,
      loading: true,
      error: false,
    });
    // let cancel;
    try {
      return await axios({
        method: "GET",
        url: `/api/workouts/paginate`,
        params: { searchquery: searchQueryInput, page: pageNumber },
        // cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      // return await axios.get(`/api/workouts/paginate?searchQuery=${searchQueryInput}&page=${pageNumber}`)
    } catch (e) {
      // if (axios.isCancel(e)) return;
      console.log(e)
      setPaginate({
        ...paginate,
        error: true,
      });
    }
  };

  useEffect(() => {
    getData().then((res) => {
      setPaginate(() => {
        return {
          ...paginate,
          workouts: [...res.data],
          hasMore: res.data.length > 0,
          loading: false,
        };
      });
    });
    return () => {
      setPaginate({
        ...paginate,
        workouts:[]
      });
    };
  }, [searchQueryInput]);

  useEffect(() => {
    getData().then((res) => {
      setPaginate(() => {
        // console.log(paginate.workouts)
        return {
          ...paginate,
          workouts: [...paginate.workouts, ...res.data],
          hasMore: res.data.length > 0,
          loading: false,
        };
      });
    });
  }, [pageNumber]);

  return paginate;
}