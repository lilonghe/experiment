<script setup lang="ts">
import { Button, Table, TableColumnType, Dropdown, Menu, MenuItem, Modal } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { getProjectList, deleteProject, IProject } from '@/db';
import EditProject from '../../components/EditProject.vue';

const editModalVisible = ref(false)
const targetId = ref()

const dataList = ref<IProject[]>([])

const columns: TableColumnType[] = [
    { key: 'name',  title: 'Project Name', dataIndex: 'name' },
    { key: 'card',  title: 'Card', dataIndex: 'card' },
    { key: 'actions',  title: 'Actions' },
]

const handleEdit = (record: any) => {
    const target = dataList.value.find(item => item.id === record.id);
    targetId.value = target?.id
    editModalVisible.value = true
}

const handleDelete = (record: any) => {
    Modal.confirm({
        title: 'Confirm delete ' + record.name + '?',
        onOk: () => {
            deleteProject(record.id)
            loadData()
        }
    })
}

const loadData = () => {
    dataList.value = getProjectList()
}

const toggleEditModalVisible = () => {
    editModalVisible.value = !editModalVisible.value;
}

const handleEditSuccess = () => {
    toggleEditModalVisible();
    loadData();
}

onMounted(() => {
    loadData()
})

</script>

<template>
    <div>
        <router-link to="/create"><Button>Create</Button></router-link>
        <div>
            <Table :data-source="dataList" :columns="columns" :pagination="false">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'actions'">
                        <Dropdown>
                            <a>Hover</a>
                            <template #overlay>
                                <Menu>
                                    <MenuItem @click="handleEdit(record)">Edit</MenuItem>
                                    <MenuItem @click="handleDelete(record)">Delete</MenuItem>
                                </Menu>
                            </template>
                        </Dropdown>
                    </template>
                </template>
            </Table>

            <EditProject 
                :visible="editModalVisible" 
                :project-id="targetId"
                @ok="handleEditSuccess" 
                @cancel="toggleEditModalVisible"/>
        </div>
    </div>
</template>