"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { useAlertStore } from "@/store/alertStore";
import { useConfirmStore } from "@/store/confirmStore";
import AdminModal from "@/app/admin/components/AdminModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { adminContentItems as initialContentItems } from "@/features/content/content.mock";
import type {
  AdminContentFormValues,
  AdminContentItem,
} from "@/features/content/content.type";

const KIND_LABEL: Record<AdminContentItem["kind"], string> = {
  MOVIE: "영화",
  SERIES: "시리즈",
};

// ── 작품 등록/수정 모달 ───────────────────────────────────

function ContentModal({
  mode,
  defaultValues,
  onClose,
  onSubmit,
}: {
  mode: "create" | "edit";
  defaultValues?: Partial<AdminContentFormValues>;
  onClose: () => void;
  onSubmit: (values: AdminContentFormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AdminContentFormValues>({
    defaultValues: {
      title: "",
      releaseDate: "",
      ageRating: "전체",
      kind: "MOVIE",
      posterImageUrl: null,
      ...defaultValues,
    },
  });

  const posterImageUrl = watch("posterImageUrl");

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // 목업 — 실제 업로드 API 없이 로컬 미리보기만 표시한다.
    setValue("posterImageUrl", URL.createObjectURL(file));
  };

  return (
    <AdminModal
      open
      onClose={onClose}
      title={`작품 ${mode === "create" ? "등록" : "수정"}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="작품 타이틀"
          hint={errors.title?.message}
          state={errors.title ? "error" : "default"}
          {...register("title", { required: "작품 타이틀을 입력하세요." })}
          placeholder="예) 붉은 항구의 밤"
          className="!bg-white !h-10 !py-0 focus:!border-admin-primary"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            포스터 이미지
          </label>
          <div className="flex items-center gap-3">
            <div className="flex h-24 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-100">
              {posterImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- 로컬 blob 미리보기, next/image 원격 패턴 불필요
                <img
                  src={posterImageUrl}
                  alt="포스터 미리보기"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon className="h-5 w-5 text-gray-300" />
              )}
            </div>
            <label className="cursor-pointer rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50">
              이미지 선택
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePosterChange}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="개봉일자"
            type="date"
            hint={errors.releaseDate?.message}
            state={errors.releaseDate ? "error" : "default"}
            {...register("releaseDate", { required: "개봉일자를 선택하세요." })}
            className="!bg-white !h-10 !py-0 focus:!border-admin-primary"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              연령 등급
            </label>
            <select
              {...register("ageRating")}
              className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
            >
              <option value="전체">전체 이용가</option>
              <option value="12">12세 이상</option>
              <option value="15">15세 이상</option>
              <option value="19">19세 이상</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            구분
          </label>
          <select
            {...register("kind")}
            className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
          >
            <option value="MOVIE">영화</option>
            <option value="SERIES">시리즈</option>
          </select>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={onClose}
            className="flex-1 !h-10 !bg-gray-100 !text-gray-700 hover:!bg-gray-200"
          >
            취소
          </Button>
          <Button
            type="submit"
            size="md"
            className="flex-1 !h-10 !bg-admin-primary hover:!bg-admin-primary-hover"
          >
            {mode === "create" ? "등록" : "수정"}
          </Button>
        </div>
      </form>
    </AdminModal>
  );
}

// ── 메인 페이지 ───────────────────────────────────────────

/**
 * 작품(영화/시리즈) 관리 페이지 — 목업 데이터 버전.
 * useQuery/useMutation 연동은 이번 범위 밖이며, 로컬 state로 CRUD를 흉내낸다.
 */
export default function ContentsPage() {
  const { setAlert } = useAlertStore();
  const { setConfirm } = useConfirmStore();

  const [items, setItems] = useState<AdminContentItem[]>(initialContentItems);
  const [modal, setModal] = useState<{
    open: boolean;
    mode: "create" | "edit";
    data?: AdminContentItem;
  }>({ open: false, mode: "create" });

  const handleSubmit = (values: AdminContentFormValues) => {
    if (modal.mode === "create") {
      setItems((prev) => [
        { id: `mock-${Date.now()}`, ...values },
        ...prev,
      ]);
      setAlert("작품이 등록되었습니다.");
    } else if (modal.data) {
      const { id } = modal.data;
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { id, ...values } : item)),
      );
      setAlert("작품이 수정되었습니다.");
    }
    setModal({ open: false, mode: "create" });
  };

  const handleDelete = (item: AdminContentItem) => {
    setConfirm(`'${item.title}'을(를) 삭제하시겠습니까?`, () => {
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      setAlert("삭제되었습니다.");
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">
            작품 목록
            {items.length > 0 && (
              <span className="ml-2 text-xs font-normal text-gray-400">
                {items.length}건
              </span>
            )}
          </h3>
          <Button
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setModal({ open: true, mode: "create" })}
            className="!h-8 !bg-admin-primary hover:!bg-admin-primary-hover"
          >
            등록
          </Button>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">
                  포스터
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">
                  타이틀
                </th>
                <th className="text-center text-xs font-medium text-gray-500 px-4 py-2.5">
                  구분
                </th>
                <th className="text-center text-xs font-medium text-gray-500 px-4 py-2.5">
                  개봉일자
                </th>
                <th className="text-center text-xs font-medium text-gray-500 px-4 py-2.5">
                  연령 등급
                </th>
                <th className="text-center text-xs font-medium text-gray-500 px-4 py-2.5">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400 text-sm">
                    등록된 작품이 없습니다.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex h-14 w-10 items-center justify-center overflow-hidden rounded bg-gray-100">
                        {item.posterImageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element -- 로컬 blob 미리보기
                          <img
                            src={item.posterImageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-4 w-4 text-gray-300" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-800">{item.title}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-admin-soft text-admin-primary">
                        {KIND_LABEL[item.kind]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {item.releaseDate}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {item.ageRating === "전체" ? "전체" : `${item.ageRating}세`}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() =>
                            setModal({ open: true, mode: "edit", data: item })
                          }
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-admin-soft rounded transition-colors"
                          title="수정"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal.open && (
        <ContentModal
          mode={modal.mode}
          defaultValues={
            modal.data
              ? {
                  title: modal.data.title,
                  posterImageUrl: modal.data.posterImageUrl,
                  releaseDate: modal.data.releaseDate,
                  ageRating: modal.data.ageRating,
                  kind: modal.data.kind,
                }
              : undefined
          }
          onClose={() => setModal({ open: false, mode: "create" })}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
