<template>
	<view class="nvue-page-root">
		<view class="page-title">
			<view class="page-title__wrapper">
				<text class="page-title__text">{{title}}</text>
			</view>
		</view>
		<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
				<view class="title"><text class="uni-form-item__title">输入关键字</text></view>
				<view class="uni-input-wrapper">
					<input class="uni-input" focus placeholder="关键字" />
				</view>

			</view>
			<button type="primary" @click="saveData">提交</button>
			<!-- <button type="primary" :loading="loading">页面主操作 Loading</button> -->
			<!-- <button type="primary" disabled="true">页面主操作 Disabled</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			saveData() {
				uni.navigateBack({
					delta: 0
				})
			}
		}
	}
</script>

<style>

</style>
