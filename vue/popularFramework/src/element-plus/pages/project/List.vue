<script setup lang="ts">
import { ElButton, ElTable, ElTableColumn, ElDropdown, ElDropdownMenu, ElDropdownItem, ElMessageBox } from 'element-plus';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { getProjectList, deleteProject, IProject } from '@/db';
import EditProject from '../../components/EditProject.vue';

const editModalVisible = ref(false)
const targetId = ref()

const dataList = ref<IProject[]>([])

const handleEdit = (record: any) => {
    const target = dataList.value.find(item => item.id === record.id);
    targetId.value = target?.id
    editModalVisible.value = true
}

const handleDelete = (record: any) => {
    ElMessageBox.
        confirm('Confirm delete ' + record.name + '?', 'Delete confirm').
        then(() => {
            deleteProject(record.id)
            loadData()
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
        <router-link to="/create"><ElButton>Create</ElButton></router-link>
        <div>
            <el-table :data="dataList" :pagination="false">
                <el-table-column prop="name" label="Project Name" />
                <el-table-column prop="card" label="Card" />
                <el-table-column label="Actions">
                    <template #default="{ row }">
                        <el-dropdown>
                            <a>Hover</a>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="handleEdit(row)">Edit</el-dropdown-item>
                                    <el-dropdown-item @click="handleDelete(row)">Delete</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>

            <EditProject 
                :visible="editModalVisible" 
                :project-id="targetId"
                @ok="handleEditSuccess" 
                @cancel="toggleEditModalVisible"/>
        </div>
    </div>
</template>