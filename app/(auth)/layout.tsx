import { ReactNode } from "react";

interface AuthLayout {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayout) {
  return (
    <div className="mx-auto w-full max-w-[343px] pt-6 md:max-w-[460px] md:pt-[100px] xl:pt-[140px]">
      {children}
    </div>
  );
}