import { useState, useEffect } from "react";
import { API } from "../api/api";
import { toast } from "sonner";

export const useFetch = (query, method = "get", payload = null, deps = [], options = { toastSuccess: false, toastError: true }) => {
  const [state, setState] = useState({
    isLoading: false,
    data: null,
    status: null,
    error: null,
  });

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        let response;

        switch (method.toLowerCase()) {
          case "get":
            response = await API.get(query);
            break;
          case "post":
            response = await API.post(query, payload);
            break;
          case "put":
            response = await API.put(query, payload);
            break;
          case "delete":
            response = await API.delete(query);
            break;
          default:
            throw new Error("Invalid method");
        }

        if (options.toastSuccess) {
          toast.success("Request successful!");
        }

        setState({
          isLoading: false,
          data: response.data,
          status: response.status,
          error: null,
        });
      } catch (error) {
        const message =
          error.response?.data?.message || error.message || "Something went wrong";

        if (options.toastError) {
          toast.error(message);
        }

        setState({
          isLoading: false,
          data: null,
          status: error.response?.status || 500,
          error: message,
        });
      }
    };

    fetchData();
  }, deps);

  return [state, setState];
};
