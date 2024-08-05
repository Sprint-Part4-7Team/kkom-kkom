export const metadata = {
  title: "팀 페이지",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:max-w-[1200px] mx-auto w-full max-w-[343px] md:max-w-[696px]">
      {children}
    </div>
  );
}
