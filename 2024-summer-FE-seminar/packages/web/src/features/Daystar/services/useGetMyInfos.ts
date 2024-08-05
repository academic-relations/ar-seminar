import apiAcf003, {
  ApiAcf003ResponseOk,
} from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf003";
import apiCms006, {
  ApiCms006ResponseOk,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms006";
import apiPrt001, {
  ApiPrt001ResponseOk,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";
import apiRnt003, {
  ApiRnt003ResponseOK,
} from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt003";

import { useQuery } from "@tanstack/react-query";

import {
  mockupMyAcf,
  mockupMyCms,
  mockupMyPrint,
  mockupMyRental,
} from "@sparcs-clubs/web/features/my/service/_mock/mockMyClub";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

export const useGetMyRental = () =>
  useQuery<ApiRnt003ResponseOK, Error>({
    queryKey: [apiRnt003.url()],
    queryFn: async (): Promise<ApiRnt003ResponseOK> => {
      const { data, status } = await axiosClient.get(apiRnt003.url(), {});

      // Possible exceptions: UnexpectedAPIResponseError, ZodError, LibAxiosError
      switch (status) {
        case 200:
          return apiRnt003.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
export const useGetMyAcf = () =>
  useQuery<ApiAcf003ResponseOk, Error>({
    queryKey: [apiAcf003.url()],
    queryFn: async (): Promise<ApiAcf003ResponseOk> => {
      const { data, status } = await axiosClient.get(apiAcf003.url(), {});

      // Possible exceptions: UnexpectedAPIResponseError, ZodError, LibAxiosError
      switch (status) {
        case 200:
          return apiAcf003.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
export const useGetMyCms = () =>
  useQuery<ApiCms006ResponseOk, Error>({
    queryKey: [apiCms006.url()],
    queryFn: async (): Promise<ApiCms006ResponseOk> => {
      const { data, status } = await axiosClient.get(apiCms006.url(), {});

      // Possible exceptions: UnexpectedAPIResponseError, ZodError, LibAxiosError
      switch (status) {
        case 200:
          return apiCms006.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
export const useGetMyPrint = () =>
  useQuery<ApiPrt001ResponseOk, Error>({
    queryKey: [apiPrt001.url()],
    queryFn: async (): Promise<ApiPrt001ResponseOk> => {
      const { data, status } = await axiosClient.get(apiPrt001.url(), {});

      // Possible exceptions: UnexpectedAPIResponseError, ZodError, LibAxiosError
      switch (status) {
        case 200:
          return apiPrt001.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiRnt003.url()).reply(() => {
    const dummy: ApiRnt003ResponseOK = mockupMyRental;
    return [200, dummy];
  });
});

defineAxiosMock(mock => {
  mock.onGet(apiPrt001.url()).reply(() => {
    const dummy: ApiPrt001ResponseOk = mockupMyPrint;
    return [200, dummy];
  });
});

defineAxiosMock(mock => {
  mock.onGet(apiAcf003.url()).reply(() => {
    const dummy: ApiAcf003ResponseOk = mockupMyAcf;
    return [200, dummy];
  });
});

defineAxiosMock(mock => {
  mock.onGet(apiCms006.url()).reply(() => {
    const dummy: ApiCms006ResponseOk = mockupMyCms;
    return [200, dummy];
  });
});
