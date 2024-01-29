<template>
	<v-container fluid="true">
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
						v-model="email"
						:rules="rules"
						color="#e9983e"
						type="email"
						class="form-input"
						label="Email address"
					></v-text-field>
					<v-text-field 
						v-model="password"
						:rules="rules"
						color="#e9983e"
						type="password"
						label="password"
						class="form-input"
					></v-text-field>
					<v-text-field
						v-if="!isLoginForm"	
						:rules="rules"
						color="#e9983e"
						type="password"
						label="retype password"
						class="form-input"
					></v-text-field>
					<v-btn type="submit" block class="mt-2 submit-btn">
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
const isLoginForm = ref(false);
const toggleForm = () => {
	isLoginForm.value = !isLoginForm.value;
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
		color: white;
	}
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
	color: white;
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
  color: white; /* Link color */
  transition: background-color 0.3s ease; /* Optional: Add a smooth hover effect */
}
.toggle-link:hover {
  color: #c77952; /* Hover text color */
}
</style>