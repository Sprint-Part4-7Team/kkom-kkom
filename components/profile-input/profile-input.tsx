import TeamProfile from "@/app/public/icons/img.svg";
import MyProfile from "@/app/public/icons/my-profile.svg";
import Image from "next/image";
import { ChangeEvent, forwardRef, useState } from "react";
import React from "react";

interface profileInputProps {
  previewImage: string;
  image: string;
  type: "teamProfile" | "myProfile";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInput = forwardRef<HTMLInputElement, profileInputProps>(
  ({ previewImage, image, type, onChange }, ref) => {
    const [isImgError, setIsImgError] = useState<boolean>(false);
    return (
      <>
        <label htmlFor="profileInput" className="cursor-pointer">
          {type === "teamProfile" &&
            (isImgError ? (
              <TeamProfile width={64} height={64} />
            ) : (
              <Image
                width={64}
                height={64}
                src={image}
                onError={() => setIsImgError(true)}
                alt="팀이미지"
              />
            ))}

          {type === "myProfile" &&
            (isImgError ? (
              <MyProfile width={64} height={64} />
            ) : (
              <Image
                width={64}
                height={64}
                src={previewImage ? previewImage : image}
                onError={() => setIsImgError(true)}
                alt="나의이미지"
              />
            ))}
        </label>

        <input
          ref={ref}
          id="profileInput"
          type="file"
          accept=".jpg, jpeg, .png"
          className="hidden"
          onChange={onChange}
        />
      </>
    );
  },
);

ProfileInput.displayName = "ProfileInput";

export default ProfileInput;
