<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-flex uni-row face-panel">
				<view class="uni-flex face fiex-one">
					<image :src="userInfo.avatarUrl" class="square" mode="aspectFill"></image>
				</view>
				<view class="uni-flex  uni-row fiex-two" style="">
					<view class="uni-flex  uni-column">
						<view class="uni-flex  right">
							<view class="text nick-name flex-top" style="text-align: left;padding: 15rpx 0 0 20rpx;"  v-if="userInfo.nickName">
								{{ userInfo.nickName }}
							</view>
							<view class="text nick-name flex-top" style="text-align: left;padding: 15rpx 0 0 20rpx;" v-else>
								<navigator url="/pages/user/login/login" open-type="redirect" hover-class="other-navigator-hover">
									<button class="mini-btn" type="default" size="mini">登陆</button>
								</navigator>
							</view>
						</view>
						<view class="uni-flex right">
							<view class="text flex-bottom"></view>
						</view>
					</view>
				</view>
				<view class="uni-flex fiex-one" style="">
					<view class="uni-flex uni-row">
						<view class="text fiex-one square">签到</view>
					</view>
				</view>
			</view>
			<view class="example-body uni-uploader-body">
				<uni-grid :column="4" :square="false" :highlight="false" border-color="#03a9f4">
					<uni-grid-item :index="index" :key="index" v-for="(item, index) in gridList">
						<navigator :url="item.url" hover-class="navigator-hover">
							<view class="grid-item-box">
								<!-- <image class="square50" src="/static/c1.png" mode="aspectFill" /> -->
								<text class="square50">{{ item.num }}</text>
								<text class="text">{{ item.title }}}</text>
								<!-- <view class="grid-dot"> -->
								<!-- <uni-badge text="1" type="primary" /> -->
								<!-- </view> -->
							</view>
						</navigator>
					</uni-grid-item>
				</uni-grid>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			let gridList = [{
					num: 0,
					title: "关注",
					url: "/pages/user/pub/pub"
				},
				{
					num: 0,
					title: "关键字",
					url: "/pages/user/keyword/keyword"
				},
				{
					num: 0,
					title: "关键字",
					url: "/pages/user/keyword/keyword"
				},
				{
					num: 0,
					title: "关键字",
					url: ""
				},
			]
			return {
				gridList
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad() {
			console.log(33, this)
		}
	}
</script>

<style>
	.fiex-one {
		width: 172.50rpx;
		text-align: center;
	}

	.fiex-two {
		width: 345rpx;
	}

	.flex-top,
	.flex-bottom {
		height: 86rpx;
		text-align: center;
		line-height: 86rpx;
		width: 345rpx;
	}

	.face-panel .face {
		width: 172.5rpx;
		height: 172.5rpx;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-align-items: center;
		align-items: center;
	}

	.square {
		width: 172.5rpx;
		height: 172.5rpx;
		line-height: 172.5rpx;
		align-items: center;
	}

	.square50 {
		width: 50rpx;
		height: 50rpx;
		/* line-height: 50rpx; */
		align-items: center;
		text-align: center;
	}

	.square100 {
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		align-items: center;
	}



	.face-panel .right {
		-webkit-flex: 1;
		flex: 1;
		-webkit-justify-content: space-between;
		justify-content: space-between;
	}

	.text {
		border: 1rpx solid #007AFF;
		box-sizing: border-box;
		text-align: center;
		color: #777;
		font-size: 26rpx;
	}

	.grid-item-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.grid-item-box .text {
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.grid-item-box .grid-dot {
		position: absolute;
		top: 10rpx;
		right: 30rpx;
	}
</style>
