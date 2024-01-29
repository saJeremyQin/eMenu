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
					>
						<!-- <template #label>
							<span class="label-text">Email address</span>
						</template> -->
					</v-text-field>
					<v-text-field 
						v-model="password"
						:rules="rules"
						color="#e9983e"
						type="password"
						label="password"
						class="form-input"
					>
						<!-- <template #label>
							<span class="label-text">Password</span>
						</template> -->
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
import iconImg from '@/assets/icon.png';
import titleImg from '@/assets/title.png';
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

	// :deep(.v-input__control) {
	// 	border: none; // Remove the original border
	// 	box-shadow: 0 1px 0 0 #fafafa; // Set initial box-shadow color to white
	// }

	// :deep(.v-input__control):hover {
	// 	box-shadow: 0 1px 0 0 #fff; // Change box-shadow color on hover
	// }

	// :deep(.v-input__control):focus-within {
	// 	box-shadow: 0 2px 0 0 #e9983e; // Set box-shadow color on focus
	// }
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