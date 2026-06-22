import { TUserRole, TUserStatus } from "@/services/user/user.domain";
import { ResponseUpdateUserDTO, UserManagementUpdateDTO } from "@/services/user/user.dto";

export const updateUserHook = async (payload: UserManagementUpdateDTO) => {
    const res = await fetch(`/api/user/${payload.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    return await res.json() as ResponseUpdateUserDTO
};

export const updateUserAuthorizedHook = async (userId: string, status: TUserStatus, role: TUserRole, validation: boolean, updateFn: () => void) => {
    try {
        if (!validation) return;

        const response = await updateUserHook({
            id: userId,
            role: role,
            status: status,
        });

        if (response.success && response.data) {
            updateFn()
        } else if (!response.success) {
            alert(`Error ${response.error_code}: ${response.message}`);
        }
    } catch (error) {
        console.error(error);
        alert("Gagal mengubah role user: Terjadi kesalahan pada server (Simulasi).");
    } finally {

    }
};