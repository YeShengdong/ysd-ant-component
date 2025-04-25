import { useState } from 'react';
import { isSuccessResponse } from '../utils';
import { useDeepEffect } from './useDeepEffect';
import { RestResponse } from '../constants';

export const useApiData = (
  service: (params: any, options?: Record<string, any>) => Promise<RestResponse>,
  params: unknown
) => {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<unknown>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useDeepEffect(() => {
    if (!params) {
      return;
    }

    let abortController: AbortController | null = null;

    const queryData = async () => {
      setLoading(true);

      try {
        abortController = new AbortController();

        const res = await service(params, { signal: abortController.signal });

        if (!isSuccessResponse(res)) {
          throw new Error(res.message);
        }

        setApiData(res.data);
      } catch (error: Error | any) {
        setErrorMessage(error?.message || '接口请求失败！');
      } finally {
        setLoading(false);
      }
    };

    queryData();

    return () => {
      abortController?.abort();
    };
  }, [params]);

  return {
    loading,
    apiData,
    errorMessage,
  };
};
