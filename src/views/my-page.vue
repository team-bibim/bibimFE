<template>
    <v-app id="inspire">
        <v-main style="background-color: #3B4048;">
            <v-container class="px-0 py-0" fluid>
                <v-card>
                    <div class="first-border">
                        <v-list style="display: flex; background-color: transparent;">
                            <v-list-item style="margin-top:43px; margin-left:36px;">
                                <v-list-item-content>
                                    <div class="id">{{ $store.state.userData.nickname }}</div>
                                    <div class="email">{{ $store.state.userData.email }}</div>
                                    <div class="Info">{{ $store.state.userInfo }}</div>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item style="margin-left: auto;">
                                <v-list-item-content>
                                    <v-btn variant="text" class="setting-btn" style="margin-top: 40px; display: block;">프로필 수정</v-btn>
                                    <v-btn variant="text" class="setting-btn" style="margin-top: 10px;">비밀번호 변경</v-btn>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>

                        <div class="divider"></div>
                        
                        <!--신체정보란-->
                        <div style="display: flex;">
                            <div class="guide-text" style="margin-left:36px;">신체정보</div>

                            <div style="margin-left: auto;">

                                <v-text-field
                                class="body-info"
                                label="키"
                                variant="outlined"
                                rounded="lg"
                                placeholder="키를 입력해 주세요"
                                suffix="cm"
                                v-model="height"
                                ></v-text-field>

                                <v-text-field 
                                class="body-info"
                                label="몸무게"
                                variant="outlined"
                                rounded="lg"
                                placeholder="몸무게를 입력해 주세요"
                                suffix="kg"
                                v-model="weight"
                                ></v-text-field>

                                <v-btn variant="text" class="complete-editing" @click="completeEdit()">작성완료</v-btn>
                            </div>
                        </div>

                        <div class="divider"></div>
                    </div>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        sessionId: null,
        height: "",
        weight: "",
    }),
    created() {
        /* 로그인 여부 확인 */
        this.checkLoginStatus();
    },
    methods: {
        async checkLoginStatus() {
            try {
                const response = await axios.get('/api/accounts/auth/', { withCredentials: true });

                if (response.data.id != null) {
                    console.log("마이페이지에서 로그인됨");
                    this.sessionId = response.data.id;
                    this.getUserData();
                } else {
                    console.log("마이페이지에서 로그인되지 않음");
                }
            } catch (error) {
                console.log("로그인 상태를 확인하는 중에 오류 발생: " + error);
            }
        },
        async getUserData() {
            try {
                console.log('로그인한 계정 ID는 ' + this.sessionId + '임'); // $store.state.sessionId

                const response = await axios.get('/api/accounts/auth/' + this.sessionId + '/');
                this.$store.commit('setUserData', response.data);

                axios.get('/api/accounts/info/')
                .then(response => {
                    console.log('헐 대박 됨!! => ' + response.data.height);
                    // 임시 야매 코드
                    this.height = response.data.height;
                    this.weight = response.data.weight;
                })
                .catch(error => {
                    console.log('내 정보 받아오다가 에러남', error);
                    this.height = '';
                    this.weight = '';
                });
            } catch (error) {
                console.error("유저데이터 받아오다가 에러남, ", error);
            }
        },
        completeEdit() {
            console.log(this.height);
            axios.put('/api/accounts/info/', {
                // 임시 야매 코드 (공개여부 데이터 항상 있어야 함)
                height: parseInt(this.height),
                weight: parseFloat(this.weight),
                acc_visibility: 1,
                /*
                height: this.height,
                weight: this.weight
                acc_visibility: this.??
                */
            })
            .then(response => {
                console.log("데이터가 있음 " + response);
            })
            .catch(error => {
                console.log("데이터가 없음 ", error);
            })
        }
    }
}
</script>

<style>
.first-border {
    width: auto;
    height: 1280px;
    flex-shrink: 0;
    border-radius: 20px;
    border: 3px solid #4B8AAF;
}

.avatar {
  background-color: #FFFFFF;
  margin: auto;
  align-items: center;
  text-align: center;
}

.id {
    color: #FFF;
    font-family: Inter;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.email {
    color: #FFF;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.Info {
    color: #FFF;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.setting-btn {
    display: flex;
    width: 135px;
    height: 40px;
    padding: 11px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #4B8AAF;
    margin-right: 30px;
}

.guide-text {
    color: #FFF;
    font-family: Inter;
    font-size: 35px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.body-info {
    width: 475px;
    height: 69px;
    margin-top: 15px;
    margin-right: 45px;

    color: #FFFFFF;
    font-family: Inter;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.complete-editing {
    display: flex;
    width: 475px;
    height: 69px;
    padding: 30px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 20px;
    background: #CD4444;
    margin-top:15px;

    color: #FFFFFF;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.divider {
    width: 95%;
    height: 1px;
    align-items: center;
    background: #4B8AAF;
    margin: 30px;
}

.v-btn {
  color: white !important
}
</style>