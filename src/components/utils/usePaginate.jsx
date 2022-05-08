import { useEffect, useState } from "react";
import axios from "axios";

export default function usePaginate(searchQueryInput, pageNumber) {
  const [paginate, setPaginate] = useState({
    loading: true,
    error: false,
    workouts: [],
    hasMore: false,
  });

  useEffect((prev) => {
    setPaginate({
      ...prev,
      workouts: [],
    });
  }, [searchQueryInput]);

  useEffect(() => {
    setPaginate({
      ...paginate,
      loading: true,
      error: false,
    });
    let cancel;
    axios({
      method: "GET",
      url: `http://localhost:9001/api/workouts/paginate`,
      params: { searchQuery: searchQueryInput, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPaginate(() => {
          console.log(paginate.workouts)
          return {
            ...paginate,
            workouts: [...paginate.workouts, ...res.data],
            hasMore: res.data.length > 0,
            loading: false,
          };
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setPaginate({
          ...paginate,
          error: true,
        });
      });
    return () => cancel();
  }, [searchQueryInput, pageNumber]);

  return paginate;
}
