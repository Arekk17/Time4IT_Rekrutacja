import { useState } from "react";
import { ApiError } from "@/lib/api/orders";

export function useApi<T = unknown>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (apiCall: () => Promise<T>): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || "Wystąpił błąd API");
      } else {
        setError("Wystąpił nieoczekiwany błąd");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setIsLoading(false);
  };

  return { execute, isLoading, error, reset };
}
