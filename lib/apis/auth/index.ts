import { LoginInputValue } from "@/app/(auth)/login/_components/login-form";
import { SignUpInputValue } from "@/app/(auth)/signup/_components/signup-form";

import { ResponseError, getErrorMessage, myFetch } from "..";
import {
  PostTeamIdAuthSigninResponse,
  PostTeamIdAuthSignupResponse,
} from "../type";

// NOTE - 로그인
export async function login(
  data: LoginInputValue,
): Promise<
  | PostTeamIdAuthSigninResponse
  | { details: Record<string, { message: string }> }
> {
  try {
    const response = await myFetch(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/auth/signIn`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result: PostTeamIdAuthSigninResponse = await response.json();
    return result;
  } catch (error) {
    const errorMessage = await getErrorMessage(error, [400]);

    if (error instanceof ResponseError && error.response.status === 400) {
      return errorMessage;
    }

    throw new Error(errorMessage || "로그인을 다시 시도해 주세요");
  }
}

// NOTE - 회원가입
export async function signUp(
  data: SignUpInputValue,
): Promise<PostTeamIdAuthSignupResponse | string> {
  try {
    const response = await myFetch(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/auth/signUp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result: PostTeamIdAuthSignupResponse = await response.json();
    return result;
  } catch (error) {
    const errorMessage = await getErrorMessage(error, [400]);

    if (error instanceof ResponseError && error.response.status === 400) {
      return errorMessage.message;
    }

    return errorMessage || "회원가입을 다시 시도해 주세요";
  }
}
