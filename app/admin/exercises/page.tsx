"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash2, Search, ChevronDown } from "lucide-react";
import { useAlertStore } from "@/store/alertStore";
import { useConfirmStore } from "@/store/confirmStore";
import {
  useAdminExerciseListQuery,
  useCreateAdminExerciseMutation,
  useUpdateAdminExerciseMutation,
  useDeleteAdminExerciseMutation,
} from "@/features/exercise/exercise.query";
import type {
  ExerciseResponse,
  ExerciseCreateRequest,
  ExerciseUpdateRequest,
} from "@/features/exercise/exercise.type";
import AdminModal from "@/app/admin/components/AdminModal";
import GlobalLoading from "@/app/components/ui/loading/GlobalLoading";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Pagination } from "@/components/ui/Pagination";
import { useCodeQuery } from "@/features/code/code.query";
import SelectOption from "@/app/onboarding/components/SelectOption";

const PAGE_SIZE = 15;

// ── 운동 모달 ─────────────────────────────────────────────

/** 운동 등록/수정 폼 필드 타입 */
type ExerciseFormValues = {
  name: string;
  bodyPartCd: string;
  equipmentCd: string;
};

/** 운동 등록 또는 수정 모달 */
function ExerciseModal({
  mode,
  defaultValues,
  onClose,
  onSubmit,
  isLoading,
}: {
  mode: "create" | "edit";
  defaultValues?: Partial<ExerciseFormValues>;
  onClose: () => void;
  onSubmit: (values: ExerciseFormValues) => void;
  isLoading: boolean;
}) {
  const { data: EQUIPMENTS = [] } = useCodeQuery({
    comCdId: "EXERCISE_EQUIPMENT_CD",
  });
  const { data: BODY_PARTS = [] } = useCodeQuery({ comCdId: "BODY_PART_CD" });

  const [bodyPartCd, setBodyPartCd] = useState(defaultValues?.bodyPartCd ?? "");
  const [equipmentCd, setEquipmentCd] = useState(
    defaultValues?.equipmentCd ?? "",
  );

  // 등록 모드에서 아직 선택 전이면 조회된 첫 번째 부위를 기본값으로 사용
  const effectiveBodyPartCd = bodyPartCd || BODY_PARTS[0]?.dtlCdId || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    defaultValues: { name: defaultValues?.name },
  });

  const submit = (values: { name: string }) => {
    onSubmit({
      name: values.name,
      bodyPartCd: effectiveBodyPartCd,
      equipmentCd,
    });
  };

  return (
    <AdminModal
      open
      onClose={onClose}
      title={`운동 ${mode === "create" ? "등록" : "수정"}`}
    >
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <Input
          label="운동 이름"
          hint={errors.name?.message}
          state={errors.name ? "error" : "default"}
          {...register("name", { required: "운동 이름을 입력하세요." })}
          placeholder="예) 벤치 프레스"
          className="!bg-white !h-10 !py-0 focus:!border-admin-primary"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            부위
          </label>
          <div className="grid grid-cols-2 gap-[8px]">
            {BODY_PARTS.map(({ dtlCdId, dtlCdNm }) => (
              <SelectOption
                key={dtlCdId}
                title={dtlCdNm}
                selected={effectiveBodyPartCd === dtlCdId}
                onClick={() => setBodyPartCd(dtlCdId)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            기구
          </label>
          <div className="grid grid-cols-2 gap-[8px]">
            <SelectOption
              title="없음"
              selected={equipmentCd === ""}
              onClick={() => setEquipmentCd("")}
            />
            {EQUIPMENTS.map(({ dtlCdId, dtlCdNm }) => (
              <SelectOption
                key={dtlCdId}
                title={dtlCdNm}
                selected={equipmentCd === dtlCdId}
                onClick={() => setEquipmentCd(dtlCdId)}
              />
            ))}
          </div>
        </div>

        {/* 하단 버튼 */}
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
            disabled={isLoading}
            className="flex-1 !h-10 !bg-admin-primary hover:!bg-admin-primary-hover"
          >
            {isLoading ? "처리중..." : mode === "create" ? "등록" : "수정"}
          </Button>
        </div>
      </form>
    </AdminModal>
  );
}

// ── 메인 페이지 ───────────────────────────────────────────

/** 운동 목록을 관리하는 관리자 페이지 */
export default function ExercisesPage() {
  const { setAlert } = useAlertStore();
  const { setConfirm } = useConfirmStore();

  // 검색 입력값 — 엔터 또는 검색 버튼을 누르기 전까지 쿼리에 반영되지 않음
  const [searchInput, setSearchInput] = useState("");
  const [bodyPartCd, setBodyPartCd] = useState("");
  const [equipmentCd, setEquipmentCd] = useState("");
  // 실제 API 쿼리에 사용하는 확정된 검색 파라미터
  const [searchParams, setSearchParams] = useState<{
    name?: string;
    bodyPartCd?: string;
    equipmentCd?: string;
  }>({});
  const [pageNum, setPageNum] = useState(1);

  const { data: BODY_PARTS = [] } = useCodeQuery({ comCdId: "BODY_PART_CD" });
  const { data: EQUIPMENTS = [] } = useCodeQuery({
    comCdId: "EXERCISE_EQUIPMENT_CD",
  });

  // 운동 등록/수정 모달 상태
  const [modal, setModal] = useState<{
    open: boolean;
    mode: "create" | "edit";
    data?: ExerciseResponse;
  }>({ open: false, mode: "create" });

  const { data: pageResult, isLoading } = useAdminExerciseListQuery({
    ...searchParams,
    pageNum,
    pageSize: PAGE_SIZE,
  });
  const exercises = pageResult?.data ?? [];
  const totalCount = pageResult?.total ?? 0;
  const totalPages = pageResult?.pages ?? 0;

  const createExercise = useCreateAdminExerciseMutation();
  const updateExercise = useUpdateAdminExerciseMutation();
  const deleteExercise = useDeleteAdminExerciseMutation();

  /** 검색 실행 — 입력값을 쿼리 파라미터로 확정 */
  const handleSearch = () => {
    setSearchParams({
      ...(searchInput.trim() ? { name: searchInput.trim() } : {}),
      ...(bodyPartCd ? { bodyPartCd } : {}),
      ...(equipmentCd ? { equipmentCd } : {}),
    });
    setPageNum(1);
  };

  /** 검색 초기화 */
  const handleSearchReset = () => {
    setSearchInput("");
    setBodyPartCd("");
    setEquipmentCd("");
    setSearchParams({});
    setPageNum(1);
  };

  /** 운동 등록 또는 수정 요청 후 모달 닫기 */
  const handleSubmit = async (values: ExerciseFormValues) => {
    const body: ExerciseCreateRequest | ExerciseUpdateRequest = {
      name: values.name,
      bodyPartCd: values.bodyPartCd,
      equipmentCd: values.equipmentCd || null,
    };
    try {
      if (modal.mode === "create") {
        await createExercise.mutateAsync(body);
        setAlert("운동이 등록되었습니다.");
      } else if (modal.data) {
        console.log(modal.data);
        await updateExercise.mutateAsync({ id: modal.data.exerciseId, body });
        setAlert("운동이 수정되었습니다.");
      }
      setModal({ open: false, mode: "create" });
    } catch {
      setAlert("처리 중 오류가 발생했습니다.");
    }
  };

  /** 운동 삭제 */
  const handleDelete = (item: ExerciseResponse) => {
    setConfirm(`'${item.name}' 운동을 삭제하시겠습니까?`, async () => {
      try {
        await deleteExercise.mutateAsync(item.exerciseId);
        setAlert("삭제되었습니다.");
      } catch {
        setAlert("삭제 중 오류가 발생했습니다.");
      }
    });
  };

  if (isLoading) return <GlobalLoading />;

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* 검색 바 */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
        <div className="flex-1 max-w-sm">
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="운동 이름 검색"
            leftIcon={<Search className="w-4 h-4" />}
            className="!bg-white !h-10 !py-0 !rounded-lg focus:!border-admin-primary"
          />
        </div>

        <div className="relative">
          <select
            value={bodyPartCd}
            onChange={(e) => setBodyPartCd(e.target.value)}
            className="appearance-none h-10 pl-3 pr-8 rounded-lg border border-gray-200 text-sm text-gray-700 outline-none focus:border-admin-primary bg-white cursor-pointer"
          >
            <option value="">전체 부위</option>
            {BODY_PARTS.map(({ dtlCdId, dtlCdNm }) => (
              <option key={dtlCdId} value={dtlCdId}>
                {dtlCdNm}
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        <div className="relative">
          <select
            value={equipmentCd}
            onChange={(e) => setEquipmentCd(e.target.value)}
            className="appearance-none h-10 pl-3 pr-8 rounded-lg border border-gray-200 text-sm text-gray-700 outline-none focus:border-admin-primary bg-white cursor-pointer"
          >
            <option value="">전체 기구</option>
            {EQUIPMENTS.map(({ dtlCdId, dtlCdNm }) => (
              <option key={dtlCdId} value={dtlCdId}>
                {dtlCdNm}
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        <Button
          size="md"
          onClick={handleSearch}
          className="!h-10 !bg-admin-primary hover:!bg-admin-primary-hover"
        >
          검색
        </Button>
        {(searchInput ||
          bodyPartCd ||
          equipmentCd ||
          Object.keys(searchParams).length > 0) && (
          <Button
            variant="ghost"
            size="md"
            onClick={handleSearchReset}
            className="!h-10 !bg-gray-100 !text-gray-700 hover:!bg-gray-200"
          >
            초기화
          </Button>
        )}
      </div>

      {/* 운동 목록 */}
      <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col min-h-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">
            운동 목록
            {totalCount > 0 && (
              <span className="ml-2 text-xs font-normal text-gray-400">
                {totalCount}건
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

        <div className="overflow-auto flex-1">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">
                  운동 이름
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">
                  부위
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-2.5">
                  기구
                </th>
                <th className="text-center text-xs font-medium text-gray-500 px-4 py-2.5">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {exercises.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-10 text-gray-400 text-sm"
                  >
                    등록된 운동이 없습니다.
                  </td>
                </tr>
              ) : (
                exercises.map((item) => (
                  <tr
                    key={item.exerciseId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-800">{item.name}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.bodyPartNm}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.equipmentNm ?? "-"}
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

        {totalPages > 1 && (
          <div className="border-t border-gray-100 py-3">
            <Pagination
              currentPage={pageNum}
              totalPages={totalPages}
              onPageChange={setPageNum}
              variant="admin"
            />
          </div>
        )}
      </div>

      {/* 운동 등록/수정 모달 */}
      {modal.open && (
        <ExerciseModal
          mode={modal.mode}
          defaultValues={
            modal.data
              ? {
                  name: modal.data.name,
                  bodyPartCd: modal.data.bodyPartCd,
                  equipmentCd: modal.data.equipmentCd ?? "",
                }
              : undefined
          }
          onClose={() => setModal({ open: false, mode: "create" })}
          onSubmit={handleSubmit}
          isLoading={createExercise.isPending || updateExercise.isPending}
        />
      )}
    </div>
  );
}
