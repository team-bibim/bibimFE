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
                    <span class="text-h5">운동 추가하기</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <!-- 운동 부위 선택-->
                                <v-select v-model="exerciseList.ExerciseArea" :items="exerciseAreaItems" label="운동 부위"
                                    required></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="exerciseList.ExerciseEquipment" label="운동 기구"
                                    readonly></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <div class="search-wrapper">
                                    <v-combobox label="운동 검색" v-model="searchData" placeholder="검색어를 입력하세요"
                                        @keydown.enter="onEnterKeyPress" @update:modelValue="updateExerciseAndUsebody"
                                        :items="searchResults" clearable></v-combobox>
                                    <v-icon @click="performSearch">mdi-magnify</v-icon>
                                </div>
                                <v-alert v-if=this.errorflag text="검색 결과가 없습니다." type="warning" variant="tonal"></v-alert>
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
import { mapState, mapMutations, mapActions } from 'vuex'
import axios from 'axios'

export default {
    // created() { this.fetchData(); },
    props: {
        boxIndex: Number  // 상위 컴포넌트에서 전달될 박스 인덱스를 받는 props
    },
    data() {
        return {
            dialog: false,
            errorflag: false,
            searchData: '', // 검색어를 저장할 데이터 속성
            searchResults: [], // 검색 결과를 저장할 데이터 속성
            searchAllResults: [], // 검색 결과를 저장할 데이터 속성 (전체 결과)
            // usebodyData와 exerciseData 추가
            // usebodyList: [],
            exerciseList: {
                ExerciseArea: '', // 선택한 운동 부위
                ExerciseName: '', // 선택한 운동
                ExerciseID: '',
                ExerciseEquipment: '',  // 선택한 운동의 운동 기구
            },
        }
    },
    computed: {
        ...mapState(['usebodyData', 'exerciseData', 'exercises']),

        exerciseAreaItems() {   // 'usebodyData'를 사용하여 `<v-select>`를 렌더링하는 computed 속성 추가
            return this.usebodyData;
        },
    },
    watch: {
        'exerciseList.ExerciseArea': function(newExerciseArea, oldExerciseArea) {
            if (newExerciseArea !== oldExerciseArea) {  // exerciseList.ExerciseArea가 변경될 때 실행됨.
                this.exerciseList.ExerciseEquipment = ''; // ExerciseEquipment 초기화
                this.searchData = ''; // searchData 초기화
                this.searchResults = []; // 검색 결과를 빈 배열로 초기화
            }
            this.performSearch();
            this.searchData = '';
        }
    },

    methods: {
        ...mapMutations(['addExerciseToBox']),
        ...mapActions(['fetchExerciseData', 'fetchUsebodyData']),
        performSearch() {
            // 검색어를 이용하여 검색을 수행하는 로직을 여기에 추가
            console.log('검색어:', this.searchQuery);
            // 검색 결과를 업데이트하거나 검색 로직을 수행할 수 있음
        },
        fetchData() {
            // fetchUsebodyData와 fetchExerciseData를 호출하여 서버에서 데이터 가져오기
            this.fetchExerciseData();
            this.fetchUsebodyData();
            // 추가: 모달을 열 때마다 exerciseList를 초기화하기
            this.resetExerciseList();
        },
        resetExerciseList() {
            // exerciseList를 초기 상태로 리셋
            this.exerciseList = {
                ExerciseArea: '', // 선택한 운동 부위
                ExerciseName: '', // 선택한 운동 이름
                ExerciseID: '',  // 선택한 운동의 ID
                ExerciseEquipment: '', // 선택한 운동의 운동 기구
            };
        },
        getExerciseNamesByArea(area) {
            console.log('exerciseData:', this.exerciseData);
            console.log('area:', area);
            console.log('area의 데이터 유형:', typeof area);
            //선택한 운동 부위에 따라 운동 목록을 반환합니다.
            const exerciseAreaData = this.exerciseData[area];
            return exerciseAreaData ? exerciseAreaData : [];
        },
        onEnterKeyPress() {
            // 검색어를 빈 문자열로 설정
            if (this.searchData === null)       // 다음 검색어가 없이(공란) enter를 누를때
                this.searchData = '';
            this.exerciseList.ExerciseEquipment = '';
            // 검색 로직 실행
            this.performSearch();
        },
        async performSearch() {
            try {
                // 검색어와 선택한 운동 부위를 서버에 보내서 검색 수행
                console.log('searchData: ', this.searchData);
                console.log('usebodyName: ', this.exerciseList.ExerciseArea);
                const response = await axios.post('http://52.78.77.1:8000/exercise/', {
                    searchData: this.searchData,
                    usebodyName: this.exerciseList.ExerciseArea
                });

                console.log(response.data.message);
                if (response.data.message) {
                    this.errorflag = true;
                }
                else {
                    this.errorflag = false;
                }

                // 데이터 형식을 확인하고 배열로 변환하기
                if (Array.isArray(response.data)) {
                    this.searchAllResults = response.data;
                    this.searchResults = this.searchAllResults.map(item => item.exerciseName_English);
                    console.log('검색 결과:', this.searchResults);
                } else {
                    console.error('검색 결과가 유효한 배열 형식이 아닙니다.');
                }

            } catch (error) {
                console.error('검색 오류:', error);
            }
        },
        async updateUsebody(selectedExercise) {
            const selectedExerciseData = this.searchAllResults.find(item => item.exerciseName_English === this.searchData);

            if (selectedExerciseData) {
                const usebodyId = selectedExerciseData.usebody_id;

                try {
                    // usebody_id를 사용하여 해당 usebody의 데이터를 가져오기
                    const usebodyResponse = await axios.get(`http://52.78.77.1:8000/usebody/${usebodyId}/`);
                    const usebodyData = usebodyResponse.data;

                    if (usebodyData && usebodyData.usebody_name) {
                        this.exerciseList.ExerciseArea = usebodyData.usebody_name;
                        console.log('선택 부위 결과:', this.exerciseList.ExerciseArea);
                    } else {
                        // usebody_name을 찾을 수 없는 경우 에러 처리
                        console.error('선택한 운동 부위 데이터를 찾을 수 없습니다.');
                    }
                } catch (error) {
                    console.error('운동 부위 데이터 가져오기 오류:', error);
                }
            } else {
                // 선택한 운동 데이터를 찾을 수 없는 경우 에러 처리
                console.error('선택한 운동 데이터를 찾을 수 없습니다.');
            }
        },
        updateExerciseEquipment(selectedExercise) {
            console.log('selected Exercise:', selectedExercise);
            console.log('운동 검색 결과:', this.searchAllResults);
            const selectedExerciseData = this.searchAllResults.find(item => item.exerciseName_English === this.searchData);
            console.log('선택 운동 결과:', selectedExerciseData);
            if (selectedExerciseData) {
                this.exerciseList.ExerciseEquipment = selectedExerciseData.equipment_name;
                console.log('선택 장비 결과:', this.exerciseList.ExerciseEquipment);
                // 여기에 id 받아오기 추가
                this.exerciseList.ExerciseID = selectedExerciseData.exercise_id;
                console.log('선택 운동 id 결과:', this.exerciseList.ExerciseID);
            } else {
                // 선택한 운동 데이터를 찾을 수 없는 경우 에러 처리
                console.error('선택한 운동 장비 데이터를 찾을 수 없습니다.');
            }
        },
        async updateExerciseAndUsebody(selectedExercise) {
            // 먼저 운동 부위 업데이트
            this.updateUsebody(selectedExercise);
            // 다음으로 운동 기구 업데이트
            this.updateExerciseEquipment(selectedExercise);     // await 안써도 되는듯

            // 선택된 아이템이 없을 때, 즉 아무것도 선택되지 않았을 때 초기화
            if (!selectedExercise) {
                this.exerciseList.ExerciseEquipment = '';
            }
        },
        closeDialogAndSave() {
            const selectedBoxIndex = this.boxIndex;
            // exerciseList를 exercise 데이터가 되도록 보내기
            console.log("저장 직전 운동 이름 :", this.exerciseList.ExerciseName);
            console.log("저장 직전 검색어 상태 :", this.searchData);
            this.exerciseList.ExerciseName = this.searchData;   // 검색어를 운동 이름으로 갱신
            this.addExerciseToBox({
                boxIndex: selectedBoxIndex,
                exercise: this.exerciseList
            });
            // exercise 데이터를 box안에 넣기
            console.log('exercises :', this.exercises);
            this.searchData = ''; // searchData 초기화, 검색 없이 입력할때 검색어 남아있는 오류 해결
            this.dialog = false;
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

.search-wrapper {
    display: flex;
    align-items: center;
    /* 아이콘을 세로 중앙에 배치합니다. */
}
</style>