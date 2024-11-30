import { create } from 'zustand'
import {
    createUserCard,
    getUserCard,
    uploadUserFaceAuth,
    uploadVisitorFaceAuth,
} from '@api/cardService/cardService'
import { generalAction } from '@store/application/useApplication'
import {
    CreateUpdateVisitorFaceAuthDto,
    CreateUserFaceAuthDto,
    GetCardByUserDto,
} from '@dtos/card/card.dto'
import { IResponse } from '@api/globalHandler'
import { deleteCookies, setCookies } from '@lib/cookies'

interface State {
    card: GetCardByUserDto
    image: string
}

interface Actions {
    createCardAction: () => Promise<IResponse<any>>
    getCardAction: () => Promise<IResponse<GetCardByUserDto>>
    uploadUserFaceAuthAction: (
        createUserFaceAuthDto: CreateUserFaceAuthDto
    ) => Promise<any>
    uploadVisitorFaceAuthAction: (
        createUpdateVisitorFaceAuthDto: CreateUpdateVisitorFaceAuthDto
    ) => Promise<any>
}

export const useCard = create<State & Actions>((set) => ({
    card: {} as GetCardByUserDto,
    image: '',
    createCardAction: async () => {
        return generalAction(
            async () => {
                const response = await createUserCard()
                if (!response?.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            'Card created successfully.', // Custom success message
            'Card creation failed. Please try again.' // Custom error message
        )
    },
    getCardAction: async () => {
        return generalAction(
            async () => {
                const response = await getUserCard()
                if (!response?.success) {
                    set({ card: {} as GetCardByUserDto })
                    deleteCookies('card')
                    throw new Error(response.msg)
                }
                setCookies('card', response.data.badgeNumber)
                set({ card: response.data })
                return response
            },
            '', // Custom success message
            'Card fetch failed. Please try again.' // Custom error message
        )
    },
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
