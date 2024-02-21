<template>
   <v-dialog
        v-model="innerShow"
        persistent
        width="600"
        height="330"
    >  
        <v-card>
        <v-card-title class="dialog-title">
            {{ props.title }}
            <v-spacer></v-spacer>
            <v-btn class="close-btn" variant="plain" icon @click="handleCancel">
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
                    >
                    </v-text-field>
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
            <v-btn color="#429488" variant="text" @click="handleSubmit">Submit</v-btn>
            <v-btn color="#429488" variant="text" @click="handleCancel">Close</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';
import eventBus from '@/utils/eventBus';

// define Props
const props = defineProps({
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
    },
    type: {
      type: String,
      required: true
    },
    item: {
      type: Object,
    }
});

const innerShow = ref(props.show);
const dishTypeData = ref({
  name:'',
  alias:'',
});


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
];

watch(() => props.show, (newValue) => {
  innerShow.value = newValue;
});

// Watch for changes in props.item
watch(() => props.item, (newItem) => {
  if (newItem) {
    dishTypeData.value.name = newItem.name || '';
    dishTypeData.value.alias = newItem.alias || '';
  }
});

const handleSubmit = () => {
  if(props.type === 'add') {
    eventBus.emit('add-confirm',{ data:dishTypeData.value});
  } else {
    eventBus.emit('edit-confirm',{ data:dishTypeData.value});
  }
}

const handleCancel = () => {
  if(props.type === 'add') {
    eventBus.emit('add-cancel');
  } else {
    eventBus.emit('edit-cancel');
  }
  dishTypeData.value.name = null;
  dishTypeData.value.alias = null;
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