import Tree from './Tree.vue'

export interface ITreeNode {
    key: string;
    title: string;
    children?: Array<ITreeNode>;
}

export { Tree }