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
    console.log('triggered')
    setPaginate({
      ...paginate,
      loading: true,
      error: false,
    });
    // let cancel;
    try {
      return await axios({
        method: "GET",
        url: `http://localhost:9001/api/workouts/paginate`,
        params: { searchQuery: searchQueryInput, page: pageNumber },
        // cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
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
        // console.log(paginate.workouts)
        return {
          ...paginate,
          workouts: [...res.data],
          hasMore: res.data.length > 0,
          loading: false,
        };
      });
    });
    // return () => cancel();
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
      // return () => cancel();
    });

    // setPaginate({
    //   ...paginate,
    //   loading: true,
    //   error: false,
    // });
    // let cancel;
    // axios({
    //   method: "GET",
    //   url: `http://localhost:9001/api/workouts/paginate`,
    //   params: { searchQuery: searchQueryInput, page: pageNumber },
    //   cancelToken: new axios.CancelToken((c) => (cancel = c)),
    // })
    //   .then((res) => {
    //     setPaginate(() => {
    //       // console.log(paginate.workouts)
    //       return {
    //         ...paginate,
    //         workouts: [...paginate.workouts, ...res.data],
    //         hasMore: res.data.length > 0,
    //         loading: false,
    //       };
    //     });
    //   })
    //   .catch((e) => {

    //   });
    // return () => cancel();
  }, [pageNumber]);

  return paginate;
}
