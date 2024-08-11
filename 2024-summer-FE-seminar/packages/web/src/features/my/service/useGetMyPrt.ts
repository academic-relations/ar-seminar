import apiPrt005 from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt005";
import { ApiPrt005RequestQuery } from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt005";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { chachaMockUpMyPrint } from "@sparcs-clubs/web/features/my/service/_mock/chachaMockMyClub";
import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

type ISuccessResponseType = z.infer<(typeof apiPrt005.responseBodyMap)[200]>;

const useGetMyPrt = (requestQuery: ApiPrt005RequestQuery) => {
  return useQuery<ISuccessResponseType, Error>({
    queryKey: [apiPrt005.url(), requestQuery], // Query Param 도 같이 줘야 함
    queryFn: async (): Promise<ISuccessResponseType> => {
      try {
        const { data, status } = await axiosClient.get(apiPrt005.url(), {
          params: requestQuery,
        });

        // console.log("Prt query: ", requestQuery);
        // console.log("Prt 응답 데이터: ", data, "code: ", status);

        switch (status) {
          case 200: {
            // console.log(apiPrt005.responseBodyMap[200].parse(data));
            return apiPrt005.responseBodyMap[200].parse(data);
          }
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
  mock.onGet(apiPrt005.url()).reply(() => {
    return [200, chachaMockUpMyPrint];
  }); // Code 200 과 함께 응답 반환
});

export default useGetMyPrt;
