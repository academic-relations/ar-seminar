import apiAcf003 from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf003";
import { ApiAcf003RequestQuery } from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf003";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { chachaMockUpMyRental } from "@sparcs-clubs/web/features/my/service/_mock/chachaMockMyClub";
import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

type ISuccessResponseType = z.infer<(typeof apiAcf003.responseBodyMap)[200]>;

const useGetMyAcf = (requestQuery: ApiAcf003RequestQuery) => {
  return useQuery<ISuccessResponseType, Error>({
    queryKey: [apiAcf003.url(), requestQuery], // Query Param 도 같이 줘야 함
    queryFn: async (): Promise<ISuccessResponseType> => {
      const { data, status } = await axiosClient.get(apiAcf003.url(), {});

      switch (status) {
        case 200:
          return apiAcf003.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
};

defineAxiosMock(mock => {
  mock.onGet(apiAcf003.url()).reply(() => {
    const dummy: z.infer<(typeof apiAcf003.responseBodyMap)[200]> =
      chachaMockUpMyRental;
    return [200, dummy]; // Code 200 과 함께 응답 반환
  });
});

export default useGetMyAcf;
