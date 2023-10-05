<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn color="#27373E" v-bind="props" class="day-routine-subbox" @click="fetchData">
                    <v-icon color="white">
                        mdi-plus
                    </v-icon>
                </v-btn>
            </template>
            <v-card color="white">
                <v-card-title>
                    <span class="text-h5">운동 검색</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-select v-model="exerciseData.ExerciseArea" :items="['0', '1', '2', '3']" label="운동 부위"
                                    required></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select v-model="exerciseData.ExerciseEquipment" :items="['0', '1', '2', '3']"
                                    label="사용 기구" required></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="searchQuery" label="검색어" placeholder="검색어를 입력하세요"
                                    append-icon="mdi-magnify" @keydown.enter="performSearch"></v-text-field>
                            </v-col>
                            <!-- 검색 결과 표시 -->

                            <v-col cols="12">
                                <p>검색 결과: {{ searchQuery }}</p>
                                <v-select v-model="exerciseData.ExerciseName" :items="['0', '1', '2', '3']" label="운동"
                                    required></v-select>
                                <!-- 검색 결과를 여기에 표시 -->
                            </v-col>


                        </v-row>
                    </v-container>
                    <!-- <small>*indicates required field</small> -->
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                        닫기
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="closeDialogAndSave">
                        저장
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            dialog: false,
            searchQuery: '', // 검색어를 저장할 데이터 속성
            exerciseData: {
                ExerciseArea: '',
                ExerciseEquipment: '',
                ExerciseName: '',
            },
        }
    },
    methods: {
        ...mapMutations(['updateDayExercises']),
        ...mapActions(['fetchExerciseData']),
        performSearch() {
            // 검색어를 이용하여 검색을 수행하는 로직을 여기에 추가
            console.log('검색어:', this.searchQuery);
            // 검색 결과를 업데이트하거나 검색 로직을 수행할 수 있음
        },
        closeDialogAndSave() {
            // 저장 버튼을 눌렀을 때 실행되는 함수
            this.updateDayExercises({
                day: this.$props.day, // day는 상위 컴포넌트에서 props로 전달되어야 합니다.
                exercises: this.exerciseData,
            });
            this.dialog = false;
        },
        fetchData() {
            this.fetchExerciseData();
        },
    },
}
</script>

<style scoped>
.day-routine-subbox {
    display: flex;
    padding: 10px 25px;
    flex-direction: column;
    align-items: inherit;
    /* inherit으로 수정 */
    gap: 7px;
    border-radius: 20px;
    /* background-color: #27373E !important; */

    width: 189px;
    height: 104px;
    min-height: 100px;
    /* 104px로 수정 */
    margin: 10px auto;
}
</style>