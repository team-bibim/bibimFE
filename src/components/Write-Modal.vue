<template>
    <div class="modal-overlay" v-if="showModal">
        <div class="modal">
            <input v-model="exercise.title" placeholder="운동 이름" class="input-field">
            <input v-model="exercise.time" placeholder="시간" class="input-field">
            <div class="button-group">
                <button @click="submitExercise" class="submit-button">{{ isEditModal ? '수정완료' : '입력완료' }}</button>
                <button @click="closeModal" class="close-button">닫기</button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: ['showModal', 'box', 'exerciseData', 'isEditModal'],
    data() {
        return {
            exercise: {
                title: this.isEditModal ? this.exerciseData.title : '', // 수정 모드인 경우에만 초기값 설정
                time: this.isEditModal ? this.exerciseData.time : '',   // 수정 모드인 경우에만 초기값 설정
            },
        };
    },
    methods: {
        exerciseData(newExerciseData) {
            if (this.isEditModal) {
                // When entering edit mode, copy the exercise data to the modal
                this.exercise.title = newExerciseData.title;
                this.exercise.time = newExerciseData.time;
                this.isEditMode = true;
            } else {
                // When exiting edit mode, clear the modal fields
                this.exercise.title = '';
                this.exercise.time = '';
                this.isEditMode = false;
            }

            // Emit the event with the updated exercise data
            this.$emit('exercise-updated', this.exercise);

            this.closeModal();
        },
        submitExercise() {
            if (this.isEditModal) {
                // Check if in edit mode and update the existing exercise
                this.exerciseData.title = this.exercise.title;
                this.exerciseData.time = this.exercise.time;
            } else {
                // Otherwise, add a new exercise to the box
                this.box.exercises.push({ title: this.exercise.title, time: this.exercise.time });
            }
            this.closeModal();
        },
        closeModal() {
            this.$emit('close-modal');
        },
    },
};
</script>
  

  
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.input-field {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.button-group {
    display: flex;
    justify-content: flex-end;
}

.submit-button,
.close-button {
    padding: 8px 16px;
    margin-left: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-button {
    background-color: #007bff;
    color: white;
}

.close-button {
    background-color: #ccc;
}
</style>
  