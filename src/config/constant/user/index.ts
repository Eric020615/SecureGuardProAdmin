export enum RoleEnum {
    'SYSTEM_ADMIN' = 'SA',
    'RESIDENT' = 'RES',
    'RESIDENT_SUBUSER' = 'SUB'
}

export enum GenderEnum {
    'MALE' = 'M',
    'FEMALE' = 'F'
}

export const RoleConst = {
    "RES": "Resident",
    "SUB": "Resident Sub User",
    "SA": "System Admin",
}

export const GenderConst = {
    "M": "Male",
    "F": "Female"
}

export const userInformationConst = {
    firstName: '',
    lastName: '',
    userName: '',
    staffId: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    files: []
}