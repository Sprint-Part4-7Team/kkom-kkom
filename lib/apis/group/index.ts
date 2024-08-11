import { myFetch } from "../myFetch";
import {
  GetTeamIdGroupsIdInvitationResponse,
  GetTeamIdGroupsIdResponse,
  PatchTeamIdGroupsIdResponse,
} from "../type";

interface GetGroupInfoProps {
  groupId: string;
}

//NOTE - 그룹에 대한 정보
export async function getGroupInfo({ groupId }: GetGroupInfoProps) {
  try {
    const response = await myFetch<GetTeamIdGroupsIdResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/groups/${groupId}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export default getGroupInfo;

interface GetGroupInvitationProps {
  groupId: string;
}

//NOTE - 그룹 초대 링크
export async function getGroupInvitation({ groupId }: GetGroupInvitationProps) {
  try {
    const response = await myFetch<GetTeamIdGroupsIdInvitationResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/groups/${groupId}/invitation`,
      {
        method: "GET",
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}

interface PatchGroupNameProps {
  groupId: string;
  image?: string;
  name?: string;
}
//NOTE - 그룹 이름 수정
export async function patchGroupName({
  groupId,
  image,
  name,
}: PatchGroupNameProps) {
  try {
    const response = await myFetch<PatchTeamIdGroupsIdResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/groups/${groupId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image, name }),
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}
