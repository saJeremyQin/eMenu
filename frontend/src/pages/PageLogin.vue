<template>
	<v-container fluid="true">
		<v-row>
			<v-col>
				<v-img :src="logoPic" class="logo-img"></v-img>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="form-col">
				<v-form @submit.prevent class="form">
					<v-text-field
						v-model="email"
						:rules="rules"
						type="email"
						class="form-input"
					>
						<template #label>
							<span class="label-text">Email address</span>
						</template>
					</v-text-field>
					<v-text-field 
						v-model="password"
						:rules="rules"
						type="password"
						label="password"
						class="form-input"
					>
						<template #label>
							<span class="label-text">Password</span>
						</template>
					</v-text-field>
					<v-btn type="submit" block class="mt-2 submit-btn">
						Submit
					</v-btn>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import logoPic from '@/assets/icon.png';
</script>

<style lang="scss" scoped>

.logo-img {
	width: 64px;
	height: 64px;
	margin-left: 32px;
}

.form-col {
	display: flex;
	justify-content: center;
	// align-items: flex-start;
	position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.form {
	width: 400px;
	height: 320px;

	.label-text {
		color:white;
	}

	:deep(.v-input__control)::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
		border-bottom-color: #c77952;
	}

	:deep(.v-input__control):focus-within::before {
		border-bottom-color: #e9983e;
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

</style>