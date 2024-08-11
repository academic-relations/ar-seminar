import apiPrt001 from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";
import { ApiPrt001RequestQuery } from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { chachaMockUpMyRental } from "@sparcs-clubs/web/features/my/service/_mock/chachaMockMyClub";
import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

type ISuccessResponseType = z.infer<(typeof apiPrt001.responseBodyMap)[200]>;

const useGetMyPrt = (requestQuery: ApiPrt001RequestQuery) => {
  return useQuery<ISuccessResponseType, Error>({
    queryKey: [apiPrt001.url(), requestQuery], // Query Param 도 같이 줘야 함
    queryFn: async (): Promise<ISuccessResponseType> => {
      const { data, status } = await axiosClient.get(apiPrt001.url(), {});

      switch (status) {
        case 200:
          return apiPrt001.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
};

defineAxiosMock(mock => {
  mock.onGet(apiPrt001.url()).reply(() => {
    const dummy: z.infer<(typeof apiPrt001.responseBodyMap)[200]> =
      chachaMockUpMyRental;
    return [200, dummy]; // Code 200 과 함께 응답 반환
  });
});

export default useGetMyPrt;
