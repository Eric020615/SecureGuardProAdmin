interface map {
    [key: string] : string
}

export const IType : map = {
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'delete',
    patch: 'patch',
}

export const FacilityName : map = {
    "BC": "Badminton Court",
    "BBC": "Basketball Court",
    "GR": "Gym Room"    
}

export const FacilitySelect = [
    {
        value: "BC",
        label: "Badminton Court"
    },
    {
        value: "BBC",
        label: "Basketball Court"
    },
    {
        value: "GR",
        label: "Gym Room"
    }
]