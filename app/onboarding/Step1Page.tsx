// Step1Page.tsx
// Motive – 온보딩 Step 1: 사용할 이름 입력
"use client";
import { UserPlus, X } from "lucide-react";
import { useRef, useState } from "react";
import OnboardingHeader from "./components/OnboardingHeader";
import Button from "@/components/Button";

interface Step1PageProps {
  onNext?: (name: string, profileImage: File | null) => void;
}

export default function Step1Page({ onNext }: Step1PageProps) {
  const [name, setName] = useState<string>("");
  const [profileImagePreview, setProfileImagePreview] = useState<
    string | null
  >(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * 프로필 이미지 등록 이벤트
   * @param e
   * @returns
   */
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImageFile(file);
    setProfileImagePreview(URL.createObjectURL(file));
  };

  /**
   * 프로필 이미지 삭제 이벤트
   */
  const handleProfileImageRemove = () => {
    setProfileImageFile(null);
    setProfileImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen w-full max-w-[402px] mx-auto bg-[#F4F8FF]">
      <OnboardingHeader step={1} />

      <div className="px-[26px] pb-[24px]">
        <p className="mt-[8px] font-['Pretendard',sans-serif] text-[22px] font-semibold text-[#0B1220]">
          사용할 이름을 입력해 주세요
        </p>

        <div className="mt-[40px] flex justify-center">
          <div className="relative size-[100px]">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="ghost"
              aria-label="프로필 사진 추가"
              onClick={() => fileInputRef.current?.click()}
              className="flex size-[100px] items-center justify-center overflow-hidden rounded-full border-[1.5px] border-dashed border-[#94A3B8] bg-white p-0 hover:bg-white"
            >
              {profileImagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profileImagePreview}
                  alt="프로필 사진"
                  className="size-full object-cover"
                />
              ) : (
                <UserPlus
                  className="size-[32px] text-[#94A3B8]"
                  strokeWidth={1.5}
                />
              )}
            </Button>
            {profileImagePreview && (
              <Button
                type="button"
                variant="ghost"
                aria-label="프로필 사진 삭제"
                onClick={handleProfileImageRemove}
                className="absolute right-0 top-0 flex size-[24px] items-center justify-center rounded-full border border-[#E2E8F0] bg-white p-0 hover:bg-white"
              >
                <X className="size-[14px] text-[#64748B]" strokeWidth={2} />
              </Button>
            )}
          </div>
        </div>

        <div className="mt-[24px] flex h-[47px] items-center rounded-[8px] border-[1.5px] border-[#E2E8F0] bg-white px-[14px]">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요"
            className="size-full bg-transparent font-['Pretendard',sans-serif] text-[14px] text-[#0B1220] placeholder:text-[#94A3B8] focus:outline-none"
          />
        </div>

        <Button
          type="button"
          disabled={!name.trim()}
          onClick={() => onNext?.(name, profileImageFile)}
          className="mt-[40px] h-[53px] w-full rounded-[8px] font-['Pretendard',sans-serif] text-[17px] font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
