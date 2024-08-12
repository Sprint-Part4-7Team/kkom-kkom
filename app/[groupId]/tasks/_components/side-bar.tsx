import ButtonFloating from "@/components/button-floating/button-floating";
import ProfileIcon from "@/components/profile-Icon/profile-icon";
import useClickOutside from "@/hooks/use-click-outside";
import useGetTask from "@/lib/apis/task/hooks/use-get-task";
import Calendar from "@/public/icons/calendar.svg";
import Kebab from "@/public/icons/kebab-small.svg";
import Repeat from "@/public/icons/repeat.svg";
import Time from "@/public/icons/time.svg";
import { convertDateToTime, convertDateToYMD } from "@/utils/convert-date";
import React from "react";

import Comment from "./comment";
import CommentInput from "./comment-input";
import PageButton from "./tasks-button";

interface SideBarProps {
  gropId: string;
  taskListId: number | undefined;
  todoId: number | undefined;
  handleCancelButton: () => void;
  isOpen: boolean;
  date: Date;
}

const SideBar = ({
  date,
  taskListId,
  todoId,
  handleCancelButton,
  isOpen,
  gropId,
}: SideBarProps) => {
  const ref = useClickOutside<HTMLDivElement>(handleCancelButton);
  const { isPending, taskDetail } = useGetTask(gropId, taskListId, todoId);
  const updateAt = convertDateToYMD(
    new Date(taskDetail ? taskDetail.updatedAt : ""),
  );
  const convertedDate = convertDateToYMD(
    new Date(taskDetail ? taskDetail.date : ""),
  );
  const { ampm, hoursString, minutesString } = convertDateToTime(
    new Date(taskDetail ? taskDetail.date : ""),
  );
  return (
    <div
      className={`fixed right-0 top-[60px] flex h-full w-full flex-row-reverse bg-transparent ${isOpen ? "translate-x-0 transition-none duration-1000 ease-in md:transition-transform" : "translate-x-full transition-none duration-1000 ease-in md:transition-transform"}`}
    >
      <div
        ref={ref}
        className="xl: w-[779px] overflow-auto border-t border-background-primary bg-background-secondary p-6 sm:w-full md:w-[435px]"
      >
        <PageButton
          className="mb-6"
          types="cancel"
          onClick={handleCancelButton}
        />
        {isPending && <div>로딩중...</div>}
        {!isPending && (
          <>
            <div className="flex justify-between">
              <h1 className="text-lg font-bold text-text-primary">
                {taskDetail?.name}
              </h1>
              <button>
                <Kebab width={24} height={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <ProfileIcon
                    image={""}
                    type="myProfile"
                    width={32}
                    height={32}
                  />
                  <p className="text-[14px] font-medium text-text-primary">
                    {taskDetail?.user?.nickname}
                  </p>
                </div>
                <p className="text-[14px] font-normal text-text-secondary">
                  {updateAt.year}.{updateAt.month}.{updateAt.day}
                </p>
              </div>

              <div className="flex items-center gap-[10px]">
                <Calendar width={16} height={16} />
                <p className="text-xs font-normal text-text-default">
                  {convertedDate.year}년 {convertedDate.month}월{" "}
                  {convertedDate.day}일
                </p>
                <p className="text-xs font-normal text-text-default">|</p>
                <Time width={16} height={16} />
                <p className="text-xs font-normal text-text-default">
                  {ampm} {hoursString}:{minutesString}
                </p>
                <p className="text-xs font-normal text-text-default">|</p>
                <Repeat width={16} height={16} />
                <p className="text-xs font-normal text-text-default">
                  매일 반복{" "}
                </p>
              </div>

              <div className="min-h-[200px]">
                <p className="text-sm font-normal">{taskDetail?.description}</p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex h-[49px] items-center border-b border-t border-gray-300">
                  <CommentInput
                    taskId={taskDetail?.id}
                    date={date}
                    taskListId={taskListId}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  {taskDetail?.comments.map((e) => (
                    <Comment key={e.id} {...e} />
                  ))}
                </div>
              </div>
            </div>
            <div className="fixed right-3 top-[85%] w-[111px]">
              <ButtonFloating
                btnSize="medium"
                btnStyle="solid"
                className="text-sm"
              >
                완료하기
              </ButtonFloating>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
