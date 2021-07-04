import React, { useState, useEffect } from 'react';
import { Tree } from 'antd';

const InfinfeTree = () => {
    const pageSize = 10;
    const [treeData, setTreeData] = useState([]);
    const [listData, setListData] = useState([]);

    const renderTreeNodes = (nodes = []) => {
        return nodes.map(node => {
            if (node.isDictionary) {
                return <Tree.TreeNode
                    dataRef={node}
                    isLeaf={false}
                    title={node.title} key={node.key}>
                    {renderTreeNodes(node.children)}
                    <Tree.TreeNode dataRef={node} title={'点击加载更多'} checkable={false} selectable={false} key={node.key + '-load-more'} />
                </Tree.TreeNode>
            }
            return <Tree.TreeNode dataRef={node} title={node.title} key={node.key} />
        })
    }

    const handleExpand = (_, { expanded, node }) => {
        if (expanded && node.dataRef.children.length === 0) {
            const { key } = node;
            let childrens = getData({ key });
            handleNewData(childrens, key);
        }
    }

    const handleClickTreeNode = (_, node) => {
        const { dataRef, key } = node;
        let skip = dataRef ? dataRef.children.length || 0 : treeData.length;
        let data = getData({ take: pageSize, skip, key });

        handleNewData(data, dataRef?.key)
    }

    const handleNewData = (data, parent) => {
        parent && data.map((_, i) => data[i].parent = parent);
        let newListData = [...listData, ...data];
        setListData(newListData);
        setNewTreeData(newListData)
    }

    const setNewTreeData = (data) => {
        let newTreeData = listToTree(data);
        setTreeData(newTreeData);
    }

    useEffect(() => {
        let data = getData();
        handleNewData(data)
    }, [])
    console.log(treeData)
    return (
        <Tree
            onClick={handleClickTreeNode}
            onExpand={handleExpand}>
            {renderTreeNodes(treeData)}
            <Tree.TreeNode title={'点击加载更多'} checkable={false} selectable={false} key={'-load-more'} />
        </Tree>
    )
}

export default InfinfeTree;



function getData() {
    return [
        { title: 'Child Node' + Math.random().toFixed(3), isDictionary: true, children: [], key: Math.random().toString() + (new Date().getTime()) },
        { title: 'Child Node' + Math.random().toFixed(3), isDictionary: true, children: [], key: Math.random().toString() + (new Date().getTime()) },
        { title: 'Child Node' + Math.random().toFixed(3), key: Math.random().toString() + (new Date().getTime()) },
        { title: 'Child Node' + Math.random().toFixed(3), key: Math.random().toString() + (new Date().getTime()) },
        { title: 'Child Node' + Math.random().toFixed(3), key: Math.random().toString() + (new Date().getTime()) },
        { title: 'Child Node' + Math.random().toFixed(3), key: Math.random().toString() + (new Date().getTime()) },
        { title: 'Child Node' + Math.random().toFixed(3), key: Math.random().toString() + (new Date().getTime()) },
        { title: 'Child Node' + Math.random().toFixed(3), key: Math.random().toString() + (new Date().getTime()) },
    ]
}

function listToTree(menus) {
    let data = JSON.parse(JSON.stringify(menus));
    const map = {};

    data.forEach(item => {
        map[item.key] = item;
    });

    const val = [];
    data.forEach(item => {
        const parent = map[item.parent];

        if (parent) {
            if (parent.parents) {
                item.parents = parent.parents.concat(parent.key);
            } else {
                item.parents = [parent.key];
            }
            (parent.children || (parent.children = [])).push(item);
        } else {
            val.push(item);
        }
    });
    return val;
}