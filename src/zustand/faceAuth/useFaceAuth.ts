import { create } from "zustand"
import { CreateUserFaceAuthDto } from "../types"
import { uploadUserFaceAuth } from "@api/faceAuthService/faceAuthService";
import { generalAction } from '@zustand/application/useApplication'

interface faceAuthState {
    error: string | null;
    uploadUserFaceAuthAction: (createUserFaceAuthDto: CreateUserFaceAuthDto) => Promise<any>;
    setError: (error: string | null) => void;
}

interface State {}

interface Actions {
	uploadUserFaceAuthAction: (createUserFaceAuthDto: CreateUserFaceAuthDto) => Promise<any>
}

export const useFaceAuth = create<State & Actions>(() => ({
	uploadUserFaceAuthAction: async (createUserFaceAuthDto: CreateUserFaceAuthDto) => {
		return generalAction(
			async () => {
				const response = await uploadUserFaceAuth(createUserFaceAuthDto)
				if(!response.success){
					throw new Error(response.msg)
				}
				return response
			},
			'Face authentication successfully uploaded!', // Custom success message
			'Failed to upload face authentication. Please try again.', // Custom error message
		)
	},
}))