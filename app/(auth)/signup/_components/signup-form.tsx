"use client";

import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import PasswordInput from "@/components/input-field/password-input";
import { signUp } from "@/lib/apis/auth";
import { showToast } from "@/lib/show-toast";
import { signUpSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export interface SignUpInputValue {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SignUpInputValue>({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignUpInputValue> = async (data) => {
    const response = await signUp(data);

    if (typeof response === "string") {
      // NOTE - 이미 존재하는 이메일인 경우 해당
      if (response.includes("이메일")) {
        setError("email", { type: "manual", message: response });
      } else if (response.includes("닉네임")) {
        setError("nickname", { type: "manual", message: response });
      }
    } else {
      showToast("success", <p>회원가입이 정상적으로 처리되었습니다.</p>);
      router.push("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <BasicInput<SignUpInputValue>
          register={register}
          id="nickname"
          placeholder="이름을 입력해 주세요"
          type="nickname"
          label="이름"
          error={errors.nickname?.message}
        />
        <BasicInput<SignUpInputValue>
          register={register}
          id="email"
          placeholder="이메일을 입력해 주세요"
          type="email"
          label="이메일"
          error={errors.email?.message}
        />
        <PasswordInput<SignUpInputValue>
          register={register}
          id="password"
          placeholder="비밀번호를 입력해 주세요"
          label="비밀번호"
          error={errors.password?.message}
        />
        <PasswordInput<SignUpInputValue>
          register={register}
          id="passwordConfirmation"
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          label="비밀번호 확인"
          error={errors.passwordConfirmation?.message}
        />
      </div>
      <Button
        btnSize="large"
        btnStyle="solid"
        className="mb-[25px] mt-10 w-full md:mb-[49px]"
        disabled={!isValid}
      >
        회원가입
      </Button>
    </form>
  );
}
