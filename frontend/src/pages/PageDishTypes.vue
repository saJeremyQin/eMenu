<template>
    <v-container>
      <v-card>
        <div class="title-div">
          <v-card-title>
            Dish Types
          </v-card-title>
          <v-btn color="#4c9df8">
           Add 
          </v-btn>
        </div>
        <v-divider class="divider"></v-divider>
      
        <v-card-text>
          <v-table>
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
                v-for="item in dishTypes"
                :key="item.id"
              >
                <td class="cell">{{ item.name }}</td>
                <td class="cell">{{ item.alias }}</td>
                <td class="actions-td cell">
                  <div class="btn-group">
                    <v-btn small color="primary" @click="editDishType(item)">Edit</v-btn>
                    <v-btn small color="error" style="margin-left: 8px;" @click="deleteDishType(item)">Delete</v-btn>
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
// import { ref } from 'vue'
const dishTypes = [
    { id: 1, name: 'Main Course', alias: 'main' },
    { id: 2, name: 'Starter', alias: 'starter' },
];

const editDishType = (item) => {
  console.log(item);
}

const deleteDishType = (item) => {
  console.log(item);
}
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
</style>
