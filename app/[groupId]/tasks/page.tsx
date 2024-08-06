import React from "react";

import TodoContainer from "./_components/todo-contianer";

const page = () => {
  return (
    <div className="max-h-sc max-w-screen-lg mx-auto h-[524px]">
      <h1 className="text text-xl font-bold text-text-primary">할일</h1>
      <TodoContainer />
    </div>
  );
};

export default page;