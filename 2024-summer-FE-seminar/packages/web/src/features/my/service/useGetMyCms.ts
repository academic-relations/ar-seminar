import apiCms007 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms007";
import { ApiCms007RequestQuery } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms007";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { chachaMockUpMyCms } from "@sparcs-clubs/web/features/my/service/_mock/chachaMockMyClub";
import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

type ISuccessResponseType = z.infer<(typeof apiCms007.responseBodyMap)[200]>;

const useGetMyCms = (requestQuery: ApiCms007RequestQuery) => {
  return useQuery<ISuccessResponseType, Error>({
    queryKey: [apiCms007.url(), requestQuery], // Query Param 도 같이 줘야 함
    queryFn: async (): Promise<ISuccessResponseType> => {
      const { data, status } = await axiosClient.get(apiCms007.url(), {
        params: requestQuery,
      });

      switch (status) {
        case 200:
          return apiCms007.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
};

defineAxiosMock(mock => {
  mock.onGet(apiCms007.url()).reply(() => [200, chachaMockUpMyCms]); // Code 200 과 함께 응답 반환
});

export default useGetMyCms;
