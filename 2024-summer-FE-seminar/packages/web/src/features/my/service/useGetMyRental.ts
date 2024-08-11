import apiRnt006 from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt006";
import { ApiRnt006RequestQuery } from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt006";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { chachaMockUpMyRental } from "@sparcs-clubs/web/features/my/service/_mock/chachaMockMyClub";
import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

type ISuccessResponseType = z.infer<(typeof apiRnt006.responseBodyMap)[200]>;

const useGetMyRental = (requestQuery: ApiRnt006RequestQuery) => {
  // console.log(requestQuery);
  return useQuery<ISuccessResponseType, Error>({
    queryKey: [apiRnt006.url(), requestQuery],
    queryFn: async (): Promise<ISuccessResponseType> => {
      const { data, status } = await axiosClient.get(apiRnt006.url(), {
        params: requestQuery,
      });
      console.log("응답 데이터: ", data, "code: ", status);

      switch (status) {
        case 200: {
          // console.log(apiRnt006.responseBodyMap[200].parse(data));
          return apiRnt006.responseBodyMap[200].parse(data);
        }
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
};

defineAxiosMock(mock => {
  mock.onGet(apiRnt006.url()).reply(() => {
    console.log("Mock API 호출됨");
    return [200, chachaMockUpMyRental];
  }); // Code 200 과 함께 응답 반환
});

export default useGetMyRental;
