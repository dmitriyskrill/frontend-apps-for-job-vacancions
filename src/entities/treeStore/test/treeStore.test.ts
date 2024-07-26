import {TreeStore} from '../treeStore'
import {
    items,
    getAllResultItems,
    getItemResult,
    getChildrenResultItems_2,
    getChildrenResultItems_4,
    getChildrenResultItems_5,
    getAllChildrenResultItems_2,
    getAllParentsResultItems_7,
} from './treeStore.mockData'


test('TreeStore test', () => {
    const ts = new TreeStore(items)
    expect(ts.getAll()).toEqual(getAllResultItems);
    expect(ts.getItem(7)).toEqual(getItemResult);
    expect(ts.getChildren(4)).toEqual(getChildrenResultItems_4);
    expect(ts.getChildren(5)).toEqual(getChildrenResultItems_5);
    expect(ts.getChildren(2)).toEqual(getChildrenResultItems_2);
    expect(ts.getAllChildren(2)).toEqual(getAllChildrenResultItems_2);
    expect(ts.getAllParents(7)).toEqual(getAllParentsResultItems_7);
});