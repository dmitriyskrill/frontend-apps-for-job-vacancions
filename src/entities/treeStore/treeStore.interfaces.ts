export type i_ItemId = string | number

export interface i_Item {
    id: i_ItemId
    parent: i_ItemId
    type?: string | null
}

export type i_Items = i_Item[]

export interface i_ItemsObject {
    [key: i_ItemId]: i_Item;
}

export interface i_AllChildrenReduceAccumulator {
    items: i_Items,
    parents: i_ItemId[]
}