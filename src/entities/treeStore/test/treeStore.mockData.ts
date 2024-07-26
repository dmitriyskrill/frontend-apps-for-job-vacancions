export const items = [
    {id: 5, parent: 2, type: 'test'},
    {id: 2, parent: 1, type: 'test'},
    {id: 3, parent: 1, type: 'test'},
    {id: 8, parent: 4, type: null},
    {id: 7, parent: 4, type: null},

    {id: 6, parent: 2, type: 'test'},
    {id: 1, parent: 'root'},
    {id: 4, parent: 2, type: 'test'},

]

export const getAllResultItems = [
    {id: 1, parent: 'root'},
    {id: 2, parent: 1, type: 'test'},
    {id: 3, parent: 1, type: 'test'},

    {id: 4, parent: 2, type: 'test'},
    {id: 5, parent: 2, type: 'test'},
    {id: 6, parent: 2, type: 'test'},

    {id: 7, parent: 4, type: null},
    {id: 8, parent: 4, type: null},
]

export const getItemResult = {id: 7, parent: 4, type: null}

export const getChildrenResultItems_2 = [
    {id: 4, parent: 2, type: 'test'},
    {id: 5, parent: 2, type: 'test'},
    {id: 6, parent: 2, type: 'test'},
]


export const getChildrenResultItems_4 = [
    {id: 7, parent: 4, type: null},
    {id: 8, parent: 4, type: null},
]

export const getChildrenResultItems_5 = []

export const getAllChildrenResultItems_2 = [
    {id: 4, parent: 2, type: 'test'},
    {id: 5, parent: 2, type: 'test'},
    {id: 6, parent: 2, type: 'test'},

    {id: 7, parent: 4, type: null},
    {id: 8, parent: 4, type: null},
]

export const getAllParentsResultItems_7 = [
    {id: 4, parent: 2, type: 'test'},
    {id: 2, parent: 1, type: 'test'},
    {id: 1, parent: 'root'},
]