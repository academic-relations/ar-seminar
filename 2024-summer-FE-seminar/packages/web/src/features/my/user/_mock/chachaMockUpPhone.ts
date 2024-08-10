import { ApiUsr001ResponseOK } from "@sparcs-clubs/interface/api/user/endpoint/apiUsr001";

const chachaMockUpMyPhone: ApiUsr001ResponseOk = {
  clubs: [
    {
      id: 1,
      name: "술박스",
    },
    {
      id: 2,
      name: "술술박스",
    },
  ],
  name: "안차차",
  email: "chayunahn@kaist.ac.kr",
  department: "전산학부",
  studentNumber: 20220390,
  phoneNumber: "01071823758",
};

export default chachaMockUpMyPhone;
