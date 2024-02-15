<template>
	<v-container fluid>
		<v-row>
			<v-col>
				<v-img :src="iconImg" class="icon-img"></v-img>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="form-col">
				<v-img :src="titleImg" class="title-img"></v-img>
				<v-form @submit.prevent class="form">
					<v-text-field
						v-model="formData.username"
						:rules="usernameRules"
						color="#e9983e"
						type="username"
						class="form-input"
						label="Username"
					></v-text-field>
					<v-text-field
						v-model="formData.email"
						:rules="emailRules"
						color="#e9983e"
						type="email"
						class="form-input"
						label="Email address"
					></v-text-field>
					<v-text-field 
						v-model="formData.password"
						:rules="passwordRules"
						color="#e9983e"
						type="password"
						label="password"
						class="form-input"
					></v-text-field>
					<v-text-field
						v-if="!isLoginForm"	
						:rules="retypePasswordRules"
						color="#e9983e"
						type="password"
						label="retype password"
						class="form-input"
					></v-text-field>
					<v-btn type="submit" block class="mt-2 submit-btn" @click="isLoginForm ? login() : register()">
						{{isLoginForm ? 'Login' : 'Register'}}
					</v-btn>
					<div class="link-wrapper">
						<a href="#" class="toggle-link" @click="toggleForm">{{ isLoginForm ? 'To Register' : 'To Login'}}</a>
					</div>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import iconImg from '@/assets/icon.png';
import titleImg from '@/assets/title.png';
import { ref } from 'vue';
import { useAuthStore } from '@/store/AuthStore';

const isLoginForm = ref(true);
const formData = ref({});
const authStore = useAuthStore();

const toggleForm = () => {
	isLoginForm.value = !isLoginForm.value;
}

const usernameRules = [
	(value) => { 
		if(value) return true
		return 'Username is required'
	},
	(value) => {
		if(/^[a-zA-Z0-9_]{4,12}$/.test(value)) return true
		return 'Username must be valid'
	}
];

const emailRules = [
	(value) => { 
		if(value) return true
		return 'Email is required'
	},
	(value) => {
		if(/.+@.+\..+/.test(value)) return true
		return 'Email must be valid'
	}
];

const passwordRules = [
	(value) => {
		if(value) return true
		return 'Password is required'
	},
	(value) => {
		if(value.length >= 6) return true
		return 'Password is too short'
	}
];

const retypePasswordRules = [
	(value) => {
		if(value) return true
		return 'Password is required'
	},
	(value) => {
		if(value === formData.value.password) return true
		return 'Passwords do not match'
	}
]

const login = () => {
	console.log('login formData is', formData.value);
	authStore.login(formData.value);
}

const register = () => {
	console.log('register formData is', formData.value);
	authStore.register(formData.value);
}
</script>

<style lang="scss" scoped>

.icon-img {
	width: 64px;
	height: 64px;
	margin-left: 32px;
}

.title-img {
	width: 240px;
	height: 182px;
}

.form-col {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}


.form {
	width: 400px;
	height: 320px;

	:deep(.v-label) {
		color: #c77952 ;
	}
	:deep(.v-messages) {
		color: rgb(72, 72, 72) !important;
	}

	color: #e9983e;
}

.submit-btn {
	width: 100%;
	height: 100%;
	padding-top: 13px;
	padding-bottom: 13px;
	border-radius: 30px;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	background: linear-gradient(136deg, #e9983e 0%, #c77952 100%);
	text-align: center;
	color: rgb(72, 72, 72);
	font-size: 16px;
	font-family: 'SF Pro Display', sans-serif;
	font-weight: 500;
	line-height: 24px;
	word-wrap: break-word;
}
.link-wrapper {
	display: flex;
	justify-content: flex-end;
	margin-top: 8px;
}
.toggle-link {
  display: inline-block;
  padding: 8px 16px;
  text-decoration: none;
  color: rgb(72, 72, 72);
  transition: background-color 0.3s ease; /* Optional: Add a smooth hover effect */
}
.toggle-link:hover {
  color: #c77952; /* Hover text color */
}
</style>