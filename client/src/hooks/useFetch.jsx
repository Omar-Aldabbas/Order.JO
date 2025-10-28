import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

export const useFetch = (
  apiFunction,
  payload = null,
  options = { toastSuccess: false, toastError: true, auto: true },
  deps = []  
) => {
  const [state, setState] = useState({
    isLoading: false,
    data: null,
    error: null,
  });

  const fetchData = useCallback(
    async (overridePayload = null) => {
      setState({ isLoading: true, data: null, error: null });
      try {
        const result = await apiFunction(overridePayload ?? payload);

        if (options.toastSuccess) toast.success("Request successful!");
        setState({ isLoading: false, data: result, error: null });
        return result;
      } catch (err) {
        const message = err?.message || "Something went wrong";
        if (options.toastError) toast.error(message);
        setState({ isLoading: false, data: null, error: message });
      }
    },
    [apiFunction, payload, options.toastError, options.toastSuccess]
  );

  // 👇 auto-fetch logic
  useEffect(() => {
    if (options.auto) fetchData();
  }, [fetchData, ...deps]); 

  return [state, fetchData];
};
