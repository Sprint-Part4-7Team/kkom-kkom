import Image from "next/image";

import Button, { LinkButton } from "../../../../../components/button/button";

interface PaginationIndicatorProps {
  page: number;
  src: string;
  alt: string;
  disabled: boolean;
}

export default function PaginationIndicator({
  page,
  src,
  alt,
  disabled,
}: PaginationIndicatorProps) {
  return (
    <>
      {!disabled ? (
        <LinkButton
          btnSize="large"
          btnStyle="outlined"
          href={`/boards?page=${page}`}
          className="w-full"
        >
          <Image src={src} alt={alt} width={24} height={24} />
        </LinkButton>
      ) : (
        <Button
          btnSize="large"
          btnStyle="outlined"
          type="button"
          disabled
          className="w-full"
        >
          <Image src={src} alt={alt} width={24} height={24} />
        </Button>
      )}
    </>
  );
}