import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function usePaginate(searchQueryInput, pageNumber) {
  const abortControllerRef = useRef();

  const [paginate, setPaginate] = useState({
    loading: true,
    error: false,
    workouts: [],
    hasMore: false,
  });

  useEffect(() => {
    setPaginate({
      ...paginate,
      workouts: [],
    });
  }, [searchQueryInput]);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    setPaginate({
      ...paginate,
      loading: true,
      error: false,
    });

    axios
      .get(`/api/workouts/paginate?searchQuery=${searchQueryInput}&page=${pageNumber}`, {
        signal: abortControllerRef.current.signal,
      })
      .then((res) => {
        setPaginate(() => {
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
    return () => abortControllerRef.current.abort();
  }, [searchQueryInput, pageNumber]);

  // const getData = async () => {
  //   abortControllerRef.current = new AbortController();
  //   setPaginate({
  //     ...paginate,
  //     loading: true,
  //     error: false,
  //   });
  //   // let cancel;
  //   try {
  //     // return await axios({
  //     //   method: "GET",
  //     //   url: `/api/workouts/paginate`,
  //     //   params: { searchquery: searchQueryInput, page: pageNumber },
  //     //   // cancelToken: new axios.CancelToken((c) => (cancel = c)),
  //     // });
  //     return await axios.get(
  //       `/api/workouts/paginate?searchQuery=${searchQueryInput}&page=${pageNumber}`,
  //       {
  //         signal: abortControllerRef.current.signal,
  //       }
  //     );
  //   } catch (e) {
  //     // if (axios.isCancel(e)) return;
  //     console.log(e);
  //     setPaginate({
  //       ...paginate,
  //       error: true,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   getData().then((res) => {
  //     setPaginate(() => {
  //       return {
  //         ...paginate,
  //         workouts: [...res.data],
  //         hasMore: res.data.length > 0,
  //         loading: false,
  //       };
  //     });
  //   });
  //   return () => {
  //     abortControllerRef.current.abort();
  //   };
  // }, [searchQueryInput]);

  // useEffect(() => {
  //   getData().then((res) => {
  //     setPaginate({
  //       ...paginate,
  //       workouts: [...paginate.workouts, ...res.data],
  //       hasMore: res.data.length > 0,
  //       loading: false,
  //     });
  //   });
  //   return () => {
  //     abortControllerRef.current.abort();
  //   };
  // }, [pageNumber]);

  return paginate;
}
