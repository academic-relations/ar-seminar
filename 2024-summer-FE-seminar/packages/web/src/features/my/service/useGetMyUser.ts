import apiUsr001 from "@sparcs-clubs/interface/api/user/endpoint/apiUsr001";
import { ApiUsr001RequestQuery } from "@sparcs-clubs/interface/api/user/endpoint/apiUsr001";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import chachaMockUpPhone from "@sparcs-clubs/web/features/my/user/_mock/chachaMockUpPhone";
import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

type ISuccessResponseType = z.infer<(typeof apiUsr001.responseBodyMap)[200]>;

const useGetMyUser = (requestQuery: ApiUsr001RequestQuery) => {
  // console.log(requestQuery);
  return useQuery<ISuccessResponseType, Error>({
    queryKey: [apiUsr001.url(), requestQuery],
    queryFn: async (): Promise<ISuccessResponseType> => {
      try {
        const { data, status } = await axiosClient.get(apiUsr001.url(), {
          params: requestQuery,
        });
        console.log("응답 데이터: ", data, "code: ", status);

        switch (status) {
          case 200: {
            return apiUsr001.responseBodyMap[200].parse(data);
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
  mock.onGet(apiUsr001.url()).reply(() => {
    return [200, chachaMockUpPhone];
  }); // Code 200 과 함께 응답 반환
});

export default useGetMyUser;
