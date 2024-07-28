import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import ClubListGrid from "@sparcs-clubs/web/features/clubs/components/ClubListGrid";
import useGetMyClub from "@sparcs-clubs/web/features/my/clubs/service/useGetMyClub";

const MyClubFrame = () => {
  const { data, isLoading, isError } = useGetMyClub();

  return (
    <FoldableSectionTitle
      title="나의 동아리"
    >
      <FlexWrapper direction="column" gap={20} >
        <MoreDetailTitle
          title="2024년 봄학기"
          moreDetail="전체 보기"
          moreDetailPath="/my/clubs"
        />
        <AsyncBoundary isLoading={isLoading} isError={isError}>
          <ClubListGrid clubList={data?.semesters[0].clubs ?? []}/>
        </AsyncBoundary>
      </FlexWrapper>
    </FoldableSectionTitle>
  );
}

export default MyClubFrame;