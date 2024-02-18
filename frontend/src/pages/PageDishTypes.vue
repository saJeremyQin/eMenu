<template>
    <v-container>
      <v-card>
        <div class="title-div">
          <v-card-title>
            Dish Types
          </v-card-title>
          <v-dialog
            v-model="dialog"
            persistent
            width="600"
            height="330"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                color="#4c9df8"
                v-bind="props"
              >
                Add DishType
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="dialog-title">
                Add DishType
                <v-spacer></v-spacer>
                <v-btn class="close-btn" variant="plain" icon @click="dialog = false">
                  <v-icon class="close-icon">mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <div class="input-row">
                        <span class="label-text">DishType Name</span>
                        <v-spacer></v-spacer>
                        <v-text-field
                          v-model="dishTypeData.name"
                          :rules="dishTypeNameRules"
                          placeholder="Input name here"
                          density="compact"
                          variant="outlined"
                          required
                          class="text-field"
                        ></v-text-field>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <div class="input-row">
                        <span class="label-text">DishType Alias</span>
                        <v-spacer></v-spacer>
                        <v-text-field
                          v-model="dishTypeData.alias"
                          :rules="dishTypeAliasRules"
                          placeholder="Input alias here"
                          density="compact"
                          variant="outlined"
                          required
                          class="text-field"
                        ></v-text-field>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="addDishType"
                >
                  Add
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="resetNewDishType"
                >
                  Reset
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
                    <v-btn density="compact" color="#429488" @click="editDishType(item)">Edit</v-btn>
                    <v-dialog
                      v-model="deleteDialog"
                      persistent
                      width="360"
                    >
                      <template v-slot:activator="{ props }">
                        <v-btn 
                          density="compact" 
                          color="#ec6337" 
                          v-bind="props"
                        >
                          Delete
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-text>Are you sure to delete this dishtype?</v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="green-darken-1"
                            variant="text"
                            @click="deleteDishType(item)"
                          >
                            Yes
                          </v-btn>
                          <v-btn
                            color="green-darken-1"
                            variant="text"
                            @click="deleteDialog = false"
                          >
                            No
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- <v-btn density="compact" color="#ec6337" style="margin-left: 8px;" @click="deleteDishType(item)">Delete</v-btn> -->
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


const dishTypeData = ref({});
// const dishTypes =  ref([]);

const dialog = ref(false);
const deleteDialog = ref(false);
const dishTypeStore = useDishTypeStore();

const dishTypeNameRules = [
	(value) => { 
		if(value) return true
		return 'dishType name is required'
	},
  (value) => {
    if(/^[a-zA-Z0-9_\s]{2,12}$/.test(value)) return true
    return 'dishType name must be valid'
  }
];

const dishTypeAliasRules = [
  (value) => { 
		if(value) return true
		return 'dishType alias is required'
	},
  (value) => {
    if(/^[a-zA-Z0-9_\s]{2,12}$/.test(value)) return true
    return 'dishType alias must be valid'
  }
]

const editDishType = (item) => {
  console.log(item);
}

const deleteDishType = async (item) => {
  console.log(`${item.name} is to be deleted`);
  console.log(item.id);
  await dishTypeStore.deleteDishType(item.id);
  deleteDialog.value = false;
}

const addDishType = async () => {
  try {
    await dishTypeStore.createDishType(dishTypeData.value);
    dialog.value = false;
  } catch (error) {
    console.log(error);   
  }
}

const resetNewDishType = () => {

}

onMounted(async() => {
  // dishTypeStore.fetchDishTypes().then(()=> {
  //   dishTypes.value = dishTypeStore.getDishTypes;
  // });
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
