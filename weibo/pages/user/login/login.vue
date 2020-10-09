<template>
	<view>
		<page-head :title="title"></page-head>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-btn-v">
				<!-- #ifdef MP-WEIXIN -->
				<button type="primary" v-if="!userInfo.nickName" open-type="getUserInfo" @getuserinfo="getUserInfo">授权登陆</button>
				<button v-if="userInfo.nickName && !userInfo.phone" open-type="getPhoneNumber" @getphonenumber="getphonenumber">绑定手机</button>
				<!-- <button type="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号</button> -->
				<!-- #endif -->
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
			return {
				hasProvider: false,
				title: "登陆"
			};
		},
		computed: {
			...mapState(['userInfo', 'providerList'])
		},
		onLoad() {
			this.initProvider()
		},
		methods: {
			initProvider() {
				const filters = ['weixin'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
						console.log(22222, this.providerList)
						
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			getphonenumber(res) {
				console.log(res)
				if("getPhoneNumber:ok" == res.detail.errMsg){
					
				}
				
			},
			...mapMutations(['getUserInfo']),
		}
	}
</script>

<style>

</style>
