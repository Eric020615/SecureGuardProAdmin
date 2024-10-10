import { create } from "zustand"
import { EditUserDetailsByIdDto, GetUserDetails, UserInformationFormDto } from "../types"
import { createUser, editUserProfileById, getUserProfileById } from "@api/userService/userService";
import { generalAction } from "@zustand/application/useApplication";

interface State {
	userProfile: GetUserDetails
}

interface Actions {
	createUserAction: (
		IUserInformationFormDto: UserInformationFormDto,
		tempToken: string,
	) => Promise<any>
	getUserProfileByIdAction: () => Promise<any>
	editUserProfileByIdAction: (IEditUserDetailsByIdDto: EditUserDetailsByIdDto) => Promise<any>
}


export const useUser = create<State & Actions>((set) => ({
	userProfile: {} as GetUserDetails,

	createUserAction: async (IUserInformationFormDto: UserInformationFormDto, tempToken: string) => {
		return generalAction(
			async () => {
				const response = await createUser(IUserInformationFormDto, tempToken)
				if(!response.success){
					throw new Error(response.msg)
				}
                return response
			},
			'User created successfully!',
			'Failed to create user. Please try again.',
		)
	},

	getUserProfileByIdAction: async () => {
		return generalAction(
			async () => {
				const response = await getUserProfileById()
				if(!response.success){
					throw new Error(response.msg)
				}
				set({ userProfile: response.data })
                return response
			},
			'',
			'Failed to retrieve user profile.',
		)
	},

	editUserProfileByIdAction: async (IEditUserDetailsByIdDto: EditUserDetailsByIdDto) => {
		return generalAction(
			async () => {
				const response = await editUserProfileById(IEditUserDetailsByIdDto)
				if(!response.success){
					throw new Error(response.msg)
				}
                return response
			},
			'User profile updated successfully!',
			'Failed to update user profile. Please try again.',
		)
	},
}))