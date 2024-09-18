import { CreateUserFaceAuthDto } from '@zustand/types'
import { getCookies } from '@lib/cookies'
import GlobalHandler, { IResponse } from '../globalHandler'
import { listUrl } from '../listUrl'

export const uploadUserFaceAuth = async (
	createUserFaceAuthDto: CreateUserFaceAuthDto,
): Promise<IResponse<any>> => {
	try {
        const cookieValue = await getCookies("token")
		const [success, response] = await GlobalHandler({
			path: listUrl.faceAuth.create.path,
			type: listUrl.faceAuth.create.type,
            _token: cookieValue as string,
            data: createUserFaceAuthDto,
		})
		const result: IResponse<any> = {
			success,
			msg: success ? 'success' : response?.message,
			data: success ? response?.data : undefined,
		}
		return result
	} catch (error: any) {
		const result: IResponse<any> = {
			success: false,
			msg: error,
			data: null,
		}
		return result
	}
}
