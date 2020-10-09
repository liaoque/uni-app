<template>
	<view>
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item, index) in swipeList" :right-options="item.options" :key="item.id" @change="swipeChange($event, index)"
			 @click="swipeClick($event, index)">
				<view class="content-box uni-flex uni-row face-panel">
					<view class="uni-flex face fiex-one">
						<image src="../../../static/plus2.png" class="square"></image>
					</view>
					<view class="uni-flex uni-row fiex-two" style="">
						<text class="content-text">{{ item.content }}</text>
					</view>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>

		<uni-fab ref="fab" :popMenu="false" :pattern="fab.pattern" :horizontal="fab.horizontal" :vertical="fab.vertical" @fabClick="fabClick" />

	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipeList: [],
				fab: {
					horizontal: 'left',
					vertical: 'bottom',
					direction: 'horizontal',
					pattern: {
						color: '#7A7E83',
						backgroundColor: '#fff',
						selectedColor: '#007AFF',
					},
				}
			}
		},
		onReady() {
			// 模拟延迟赋值
			let btnDel = {
				text: '删除',
				style: {
					backgroundColor: 'rgb(255,58,49)'
				}
			};
			// 模拟延迟赋值
			setTimeout(() => {
				this.swipeList = [{
						options: [btnDel],
						id: 0,
						content: 'item1'
					},
					{
						id: 1,
						options: [btnDel],
						content: 'item2'
					},
					{
						id: 2,
						options: [btnDel],
						content: 'item3'
					}
				]
			}, 1000);
		},
		methods: {
			swipeChange(e, index) {
				console.log('返回：', e);
				console.log('当前索引：', index);

			},
			swipeClick(e, index) {
				let {
					content
				} = e;
				if (content.text === '删除') {
					uni.showModal({
						title: '提示',
						content: '是否删除',
						success: res => {
							if (res.confirm) {
								this.swipeList.splice(index, 1);
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			fabClick() {
				uni.showToast({
					title: '点击了悬浮按钮',
					icon: 'none'
				})
				uni.navigateTo({
					url:"./add/add"
				})
			},
		}
	}
</script>


<style>
	@charset "UTF-8";

	.fiex-one {
		width: 172.50rpx;
		text-align: center;
	}

	.fiex-two {
		width: 345rpx;
	}

	.square {
		height: 88rpx;
		width: 88rpx;
		line-height: 88rpx;
		align-items: center;
	}

	.face-panel .face {
		width: 88rpx;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-align-items: center;
		align-items: center;
	}

	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url("~@/static/uni.ttf") format("truetype");
	}

	/* #endif */
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	/* #endif */

	.content-box {
		flex: 1;
		height: 44px;
		line-height: 44px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		border-bottom-color: #f5f5f5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.content-text {
		font-size: 15px;
		color: #6E6E6E;
	}


	.slot-button-text {
		color: #ffffff;
		font-size: 14px;
	}
</style>
