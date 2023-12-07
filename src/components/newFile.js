import { mapState, mapMutations, mapActions } from 'vuex';
import axios from 'axios';

export default (await import('vue')).defineComponent({
    // created() { this.fetchData(); },
    data() {
        return {
            dialog: false,
            errorflag: false,
            searchData: '',
            searchResults: [],
            searchAllResults: [],

            // usebodyData와 exerciseData 추가
            usebodyList: [],
            exerciseList: {
                ExerciseArea: '',
                ExerciseName: '',
                ExerciseEquipment: '', // 선택한 운동의 운동 기구
            },
        };
    },
    computed: {
        ...mapState(['usebodyData', 'exerciseData']),
        // 'usebodyData'를 사용하여 `<v-select>`를 렌더링하는 computed 속성 추가
        exerciseAreaItems() {
            return this.usebodyData;
        },
    },
    watch: {
        'exerciseList.ExerciseArea': function(newExerciseArea, oldExerciseArea) {
            // exerciseList.ExerciseArea가 변경될 때 실행됩니다.
            if (newExerciseArea !== oldExerciseArea) {
                this.exerciseList.ExerciseEquipment = ''; // ExerciseEquipment 초기화
                this.searchData = ''; // searchData 초기화
                this.searchResults = []; // 검색 결과를 빈 배열로 초기화
            }
        },
    },

    methods: {
        ...mapMutations(['updateDayExercises']),
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
        },
        getExerciseNamesByArea(area) {
            console.log('exerciseData:', this.exerciseData);
            console.log('area:', area);
            console.log('area의 데이터 유형:', typeof area);
            //선택한 운동 부위에 따라 운동 목록을 반환합니다.
            const exerciseAreaData = this.exerciseData[area];
            return exerciseAreaData ? exerciseAreaData : [];
        },
        handleInput() {
            console.log("searchData 감지 : ", this.searchData);
            if (this.searchData === null) {
                this.exerciseList.ExerciseEquipment = '';
            }//;
        },
        onEnterKeyPress() {
            // 검색어를 빈 문자열로 설정
            if (this.searchData === null) // 다음 검색어가 없이(공란) enter를 누를때
                this.searchData = '';
            this.exerciseList.ExerciseEquipment = '';
            // 검색 로직을 실행할 수 있습니다.
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
                    // exerciseArea: this.exerciseList.ExerciseArea,
                });

                console.log(response.data.message);
                if (response.data.message) {
                    this.errorflag = true;
                }
                else {
                    this.errorflag = false;
                }



                // 데이터 형식을 확인하고 배열로 변환하십시오.
                if (Array.isArray(response.data)) {
                    this.searchAllResults = response.data;
                    this.searchResults = this.searchAllResults.map(item => item.exerciseName_English);
                    // 예시: 검색 결과를 콘솔에 출력
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
                    // usebody_id를 사용하여 해당 usebody의 데이터를 가져옵니다.
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
            } else {
                // 선택한 운동 데이터를 찾을 수 없는 경우 에러 처리
                console.error('선택한 운동 장비 데이터를 찾을 수 없습니다.');
            }
        },
        async updateExerciseAndUsebody(selectedExercise) {
            // 먼저 운동 부위 업데이트
            this.updateUsebody(selectedExercise);
            // 다음으로 운동 기구 업데이트
            await this.updateExerciseEquipment(selectedExercise);
        },
        closeDialogAndSave() {
            // 저장 버튼을 눌렀을 때 실행되는 함수
            this.updateDayExercises({
                day: this.$props.day,
                exercises: this.exerciseData,
            });
            this.dialog = false;
        },
    },
});
