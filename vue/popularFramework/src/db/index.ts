export interface IProject {
    id?: string;
    name: string;
    password: string;
    card?: string;
}

interface IStore {
    projectList: Array<IProject>;
}

let store: IStore = {
    projectList: []
};

export function getProjectList() {
    return [...store.projectList];
}

export function getProjectById(id: string) {
    const target = store.projectList.find(item => item.id === id)
    if (target) {
        return {...target}
    }
    return undefined;
}

export function createProject(project: IProject) {
    store.projectList.push({
        id: Math.random().toString(),
        ...project,
    })
    return {}
}

export function deleteProject(id: string) {
    store.projectList = store.projectList.filter(item => item.id !== id);
}

export function editProject(project: IProject) {
    let index = store.projectList.findIndex(item => item.id === project.id);
    if (index !== -1) {
        store.projectList[index] = project;
    }
}

setInterval(() => {
    localStorage.setItem('project-list', JSON.stringify(store.projectList))
}, 100)

const readLocalData = localStorage.getItem('project-list')
if (readLocalData !== null && readLocalData !== '') {
    store.projectList = JSON.parse(readLocalData)
}
