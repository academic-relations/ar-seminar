import apiAcf007 from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf007";
import { ApiAcf007RequestQuery } from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf007";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { chachaMockUpMyAcf } from "@sparcs-clubs/web/features/my/service/_mock/chachaMockMyClub";
import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

type ISuccessResponseType = z.infer<(typeof apiAcf007.responseBodyMap)[200]>;

const useGetMyAcf = (requestQuery: ApiAcf007RequestQuery) => {
  return useQuery<ISuccessResponseType, Error>({
    queryKey: [apiAcf007.url(), requestQuery], // Query Param 도 같이 줘야 함
    queryFn: async (): Promise<ISuccessResponseType> => {
      try {
        const { data, status } = await axiosClient.get(apiAcf007.url(), {
          params: requestQuery,
        });
        console.log("Acf query: ", requestQuery);
        console.log("Acf 응답 데이터: ", data, "code: ", status);
        switch (status) {
          case 200:
            return apiAcf007.responseBodyMap[200].parse(data);
          default:
            throw new UnexpectedAPIResponseError();
        }
      } catch (error) {
        console.error("쿼리 함수에서 에러 발생:", error);
        throw error; // 에러를 다시 던져서 AsyncBoundary에서 처리되도록 함
      }
    },
  });
};

defineAxiosMock(mock => {
  mock.onGet(apiAcf007.url()).reply(() => {
    return [200, chachaMockUpMyAcf];
  }); // Code 200 과 함께 응답 반환
});

export default useGetMyAcf;
