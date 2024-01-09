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
                                    <v-btn variant="text" class="setting-btn" style="margin-top: 40px; display: block;">프로필
                                        수정</v-btn>
                                    <v-btn variant="text" class="setting-btn" style="margin-top: 10px;">비밀번호 변경</v-btn>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>

                        <div class="divider"></div>

                        <!--신체정보란-->
                        <div style="display: flex;">
                            <div class="guide-text" style="margin-left:36px;">신체정보</div>

                            <div style="margin-left: auto;">

                                <v-text-field class="body-info" label="키" variant="outlined" rounded="lg"
                                    placeholder="키를 입력해 주세요" suffix="cm" v-model="height"></v-text-field>

                                <v-text-field class="body-info" label="몸무게" variant="outlined" rounded="lg"
                                    placeholder="몸무게를 입력해 주세요" suffix="kg" v-model="weight"></v-text-field>

                                <v-btn variant="text" class="complete-editing" @click="completeEdit()">작성완료</v-btn>
                            </div>
                        </div>

                        <div class="divider"></div>


                        <div id="back">
                            <div id="back-round">
                                <div class="open-switch">
                                    <div class="open-s-text">계정 공개 여부</div>
                                    <v-switch v-model="model" hide-details inset @change="updateAccountVisibility"
                                        style="transform: scale(1.2);"></v-switch>
                                </div>
                                <div class="line"></div>
                                <div class="myroutine">
                                    <div class="myroutine-text">내 루틴</div>
                                    <v-table id="tb" class="custom-table" style="padding: 20px;">
                                        <thead>
                                            <tr>
                                                <th class="text-left" style="font-weight: bold;">
                                                    #
                                                </th>
                                                <th class="text-left" style="font-weight: bold;">
                                                    루틴제목
                                                </th>
                                                <th class="text-left" style="font-weight: bold;">
                                                    루틴설명
                                                </th>
                                                <th class="text-left">

                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in routines" :key="item.routine_name">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ item.routine_name }}</td>
                                                <td>{{ item.routine_comment }}</td>
                                                <td>
                                                    <v-btn variant="tonal" style="background-color: #CD4444;">수정</v-btn>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </div>
                            </div>
                        </div>
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
        // 희경 누나 코드
        model: true,
        routines: [],
    }),
    created() {
        /* 로그인 여부 확인 */
        axios.get('/api/accounts/auth/', { withCredentials: true })
            .then(response => {
                if (response.data.id != null) {
                    console.log("로그인됨");
                    // console.log(this.$store.state.userData.id);
                } else {
                    console.log("로그인되지 않음");
                }
            })
            .catch(error => {
                console.log("로그인 상태를 확인하는 중에 오류 발생: " + error);
            });

        /* 유저 데이터 받아오기 */
        this.getUserData();
    },
    methods: {
        getUserData() {
            axios.get('/api/accounts/auth/' + this.$store.state.userData.id + '/')
                .then(response => {
                    this.$store.commit('setUserData', response.data);
                    // console.log('유저 소개 메시지는 ' + response.data.info);

                    const userName = response.data.nickname;
                    const userEmail = response.data.email;

                    console.log(userName, userEmail);
                })
                .catch(error => {
                    console.error("유저데이터 받아오다가 에러남, ", error);
                });

            axios.get('/api/accounts/info/')
                .then(response => {
                    console.log('내 정보 잘 받아옴', response);
                    this.$store.commit('userInfo', response.info);
                    this.height = response.data.height;
                    this.weight = response.data.weight;
                    console.log('accVisibility', response.data.acc_visibility);
                })
                .catch(error => {
                    console.log('내 정보 받아오다가 에러남', error);
                    this.height = '';
                    this.weight = '';
                })
        },
        completeEdit() {
            axios.put('/api/accounts/info/', {
                height: parseInt(this.height),
                weight: parseFloat(this.weight),
                accVisibility: 1
            })
                .then(response => {
                    console.log("수정됨!! " + response);
                })
                .catch(error => {
                    console.log("수정하다가 에러남 ", error);
                })
        },
        // 희경 누나 코드
        async fetchRoutineData() {
            try {
                const response = await axios.get('/api/routine/check/mine/');
                this.routines = response.data;
            } catch (error) {
                console.error('Error fetching routine data:', error);
            }
        },
        async updateAccountVisibility() {
            try {
                await axios.put('/api/accounts/info/', {
                    acc_visibility: this.model ? 1 : 0,
                    height: parseInt(this.height),
                    weight: parseFloat(this.weight),
                });

                console.log('Update success:', response.data);

            } catch (error) {
                console.log('바뀜', this.model ? 1 : 0)
                if (error.response) {
                    console.error('Server responded with error status:', error.response.status);
                    console.error('Error details:', error.response.data);
                } else if (error.request) {
                    console.error('No response received from the server');
                }
            }
        },
    },
    mounted() {
        // 희경 누나 코드
        this.fetchRoutineData();
    },

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
    margin-top: 15px;

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


/* 희경 누나 코드 */
#back {
    position: relative;
    background-color: #181B21;
    border-radius: 20px;
    height: 500px;
    align-items: center;
}

.t {
    color: white;
}

.line {
    text-align: center;
    border-bottom: 1px solid #4B8AAF;
    margin-left: 30px;
    margin-right: 30px;
}

.open-s-text {
    margin-bottom: 40px;
    color: white;
    font-size: 30px;
    font-weight: bold;
    white-space: nowrap;
    margin-left: 30px;
}

.myroutine-text {
    color: white;
    font-size: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 30px;
    font-weight: bold;
}

.open-switch {
    display: flex;
    align-items: center;
    margin-left: auto
}

.v-switch {
    position: absolute;
    right: 0;
    margin-right: 40px;
}

.v-switch .v-selection-control {
    min-height: var(--v-input-control-height);
    margin-bottom: 30px;
}

#tb {
    margin: 20px;
    border-radius: 10px;
}

.custom-table {
    background-color: #27373E;
    color: white;
}
</style>

<style scoped>
.v-btn {
    color: white !important
}

.v-text-field .v-input__suffix .v-text-field__suffix {
    color: white !important;
}

.v-btn {
    color: white !important
}
</style>
