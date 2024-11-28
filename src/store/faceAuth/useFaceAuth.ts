import { create } from 'zustand'
import {
    uploadUserFaceAuth,
    uploadVisitorFaceAuth,
} from '@api/faceAuthService/faceAuthService'
import { generalAction } from '@store/application/useApplication'
import {
    CreateUpdateVisitorFaceAuthDto,
    CreateUserFaceAuthDto,
} from '@dtos/faceAuth/faceAuth.dto'

interface faceAuthState {
    error: string | null
    uploadUserFaceAuthAction: (
        createUserFaceAuthDto: CreateUserFaceAuthDto
    ) => Promise<any>
    setError: (error: string | null) => void
}

interface State {
    image: string
}

interface Actions {
    uploadUserFaceAuthAction: (
        createUserFaceAuthDto: CreateUserFaceAuthDto
    ) => Promise<any>
    uploadVisitorFaceAuthAction: (
        createUpdateVisitorFaceAuthDto: CreateUpdateVisitorFaceAuthDto
    ) => Promise<any>
}

export const useFaceAuth = create<State & Actions>(() => ({
    image: '',
    uploadUserFaceAuthAction: async (createUserFaceAuthDto: CreateUserFaceAuthDto) => {
        return generalAction(
            async () => {
                const response = await uploadUserFaceAuth(createUserFaceAuthDto)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            'Face authentication successfully uploaded!', // Custom success message
            'Failed to upload face authentication. Please try again.' // Custom error message
        )
    },
    uploadVisitorFaceAuthAction: async (
        createUpdateVisitorFaceAuthDto: CreateUpdateVisitorFaceAuthDto
    ) => {
        return generalAction(
            async () => {
                const response = await uploadVisitorFaceAuth(
                    createUpdateVisitorFaceAuthDto
                )
                if (!response.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            'Face authentication successfully uploaded!', // Custom success message
            'Failed to upload face authentication. Please try again.' // Custom error message
        )
    },
}))
