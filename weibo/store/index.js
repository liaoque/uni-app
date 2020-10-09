import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		providerList: [],
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userInfo: {
			nickName: '',
			phone: '',
			avatarUrl: '',
		},
		userName: ""
	},
	mutations: {

		getUserInfo() {
			console.log(this.state.providerList)
			uni.getUserInfo && uni.getUserInfo({
				provider: this.state.providerList[0].value,
				success: (infoRes) => {
					console.log("getUserInfo", infoRes)
					if(infoRes.errMsg ==  "getUserInfo:ok"){
						this.state.userInfo = infoRes.userInfo
					}
				},
				fail() {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			});
		},
		getPreUserInfo() {
			uni.getSetting && uni.getSetting({
				scope: 'scope.userInfo',
				success(res) {
					console.log("getPreUserInfo success", res)
					if (res.authSetting["scope.getUserInfo"]) {
						this.getUserInfo();
					}
				},
				fail(res) {
					console.log("getPreUserInfo fail", res)
				}
			})
		},
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		}
	}
})

export default store
