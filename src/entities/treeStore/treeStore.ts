import {i_Items, i_Item, i_ItemId, i_ItemsObject, i_AllChildrenReduceAccumulator} from "./treeStore.interfaces";

export class TreeStore {
    public readonly itemsObject: i_ItemsObject

    constructor(items: i_Items) {
        const sortedItems = items.sort(this.sort)
        this.itemsObject = sortedItems.reduce((acc, item: i_Item) => {
            // @ts-ignore
            acc[item.id] = item
            return acc
        }, {})
    }

    private sort(a: i_Item, b: i_Item) {
        return +(b.parent < a.parent) - +(a.parent < b.parent) || +(b.id < a.id) - +(a.id < b.id);
    }

    public getAll(): i_Items {
        return Object.values(this.itemsObject)
    }

    public getItem(id: i_ItemId): i_Item | null {
        return this.itemsObject[id] || null
    }

    public getChildren(id: i_ItemId): i_Items {
        return this.getAll().reduce((acc: i_Items, item) => {
            if (item.parent === id) acc.push(item)
            return acc
        }, [])
    }

    /*
    Принимает id элемента и возвращает массив элементов, являющихся прямыми дочерними элементами того,
    чей id получен в аргументе + если у них в свою очередь есть еще дочерние элементы, они все тоже будут включены в результат,
    и так до самого глубокого уровня.
    */
    public getAllChildren(id: i_ItemId): i_Items {
        // Т.к. изначально массив был отсортирован по parent, a далее по id, то мы можем быть уверены в том, что все
        // последующие элементы будут либо на одном уровне текущим либо будут дочерними
        const {items} = this.getAll().reduce((acc: i_AllChildrenReduceAccumulator, item) => {
            if (acc.parents.includes(item.parent)) {
                acc.items.push(item)
                if (!acc.parents.includes(item.id)) acc.parents.push(item.id)
            }
            return acc
        }, {
            items: [],
            parents: [id]
        })
        return items
    }

    public getAllParents(id: i_ItemId): i_Items {
        const items: i_Items = []
        const childItem = this.itemsObject[id]
        if (!childItem) return items
        let parent = this.itemsObject[childItem.parent]
        while (parent) {
            items.push(parent)
            parent = this.itemsObject[parent.parent]
        }
        return items
    }
}