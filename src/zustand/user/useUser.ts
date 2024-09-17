import { create } from "zustand"
import { EditUserDetailsByIdDto, UserInformationFormDto } from "../types"
import { createUser, editUserProfileById, getUserProfileById } from "@api/userService/userService";

interface userState {
    isLoading: boolean;
    error: string | null;
    createUserAction: (IUserInformationFormDto: UserInformationFormDto, tempToken: string) => Promise<any>;
    getUserProfileByIdAction: () => Promise<any>;
    editUserProfileByIdAction: (IEditUserDetailsByIdDto : EditUserDetailsByIdDto) => Promise<any>;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useUser = create<userState>((set) => ({
    isLoading: false,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    createUserAction: async (IUserInformationFormDto: UserInformationFormDto, tempToken: string) => {
        try {
            set({ isLoading: true, error: null });
            const response = await createUser(IUserInformationFormDto, tempToken);
            return response;
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    },
    getUserProfileByIdAction: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await getUserProfileById();
            return response;
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    },
    editUserProfileByIdAction: async (IEditUserDetailsByIdDto : EditUserDetailsByIdDto) => {
        try {
            set({ isLoading: true, error: null });
            const response = await editUserProfileById(IEditUserDetailsByIdDto);
            return response;
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    }
}))