<template>
    <v-container>
      <v-card>
        <div class="title-div">
          <v-card-title>
            Dish Types
          </v-card-title>
          <v-btn density="compact" color="#4c9df8" @click="addDialog=true">
            Add DishType
          </v-btn>
          <a-e-dialog :show="addDialog" title="Add DishType" type="add" />
        </div>
        <v-divider class="divider"></v-divider>    
        <v-card-text>
          <v-table density="compact">
            <thead class="table-header">
              <tr>
                <th class="text-left cell">
                  Name
                </th>
                <th class="text-left cell">
                  Alias
                </th>
                <th class="text-right cell actions-th" style="width: 280px;">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in dishTypeStore.dishTypes"
                :key="item.id"
              >
                <td class="cell">{{ item.name }}</td>
                <td class="cell">{{ item.alias }}</td>
                <td class="actions-td cell">
                  <div class="btn-group">
                    <v-btn density="compact" color="#429488" @click="prepareToEdit(item)">
                      Edit
                    </v-btn>
                    <a-e-dialog :show="editDialog" title="Edit DishType" type="edit" :item="dishTypeToBeEdited" />
                    <v-btn density="compact" color="#ec6337" style="margin-left: 8px;" @click="prepareToDelete(item)">
                      Delete
                      <v-dialog
                        v-model="deleteDialog"
                        persistent
                        width="360"
                      >  
                        <v-card>
                          <v-card-text>Are you sure to delete this dishtype?</v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="green-darken-1"
                              variant="text"
                              @click="deleteDishType"
                            >
                              Yes
                            </v-btn>
                            <v-btn
                              color="green-darken-1"
                              variant="text"
                              @click="cancelDeleteDishType"
                            >
                              No
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-container>
  </template>

<script setup>
import { ref } from 'vue';
import { useDishTypeStore } from '@/store/DishTypeStore';
import { onMounted } from 'vue';
import AEDialog from '@/components/AEDialog.vue';
import eventBus from '@/utils/eventBus';

let dishTypeToBeDeleted = null;
let dishTypeToBeEdited = null;

const addDialog = ref(false);
const deleteDialog = ref(false);
const editDialog = ref(false);
const dishTypeStore = useDishTypeStore();

const prepareToEdit = (item) => {
  dishTypeToBeEdited = item;
  editDialog.value = true;
}
const prepareToDelete = (item) => {
  dishTypeToBeDeleted = item;
  deleteDialog.value = true;
}

eventBus.on('add-confirm', async ({data}) => {
  console.log('DishTypData in Add-Confirm is', data);
  try {
    await dishTypeStore.createDishType(data);
    addDialog.value=false;
  } catch (error) {
    console.log(error.message);
  }
});

eventBus.on('add-cancel', () => {
  addDialog.value = false;
});

eventBus.on('edit-confirm', async ({data}) => {
  try {
    await dishTypeStore.editDishType(dishTypeToBeEdited.id, data);
  } catch (error) {
    console.log(error);
  }
  dishTypeToBeEdited=null;
  editDialog.value=false;
})

eventBus.on('edit-cancel', () => {
  dishTypeToBeEdited = null;
  editDialog.value = false;
})

const deleteDishType = async () => {
  await dishTypeStore.deleteDishType(dishTypeToBeDeleted.id);
  dishTypeToBeDeleted = null;
  deleteDialog.value = false;
}

const cancelDeleteDishType = () => {
  dishTypeToBeDeleted = null;
  deleteDialog.value = false;
}

onMounted(async() => {
  await dishTypeStore.fetchDishTypes();
})
</script>

<style lang="scss" scoped>
.title-div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 10px;
  align-items: center;
}
.divider {
  margin: 10px 0;
}
.table-header {
  background-color: #f2f2f2; 
  text-align: left;
  th.actions-th {
    text-align: left !important;
  }
}
.text-left, .text-right {
  font-weight: 700;
  font-size: medium;
}
.cell {
  border: 1px solid #ccc;
}
.actions-td {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: auto;
  padding: 8px;
}
.btn-group {
  margin-left: 4px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.dialog-title {
  background-color: #f8f8f8;
  padding-left: 16px;
  font-size: medium;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.close-icon {
  font-size: 18px;
  line-height: 0; 
}
.input-row {
  display: flex;
  flex-direction: row;
  margin:4px 25px;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
}
.text-field {
  width: 300px;
}
.label-text {
  font-size: small;
  display: inline-flex;
  align-items: center;
  padding-bottom: 20px;
  margin-right: 10px;
}
</style>
