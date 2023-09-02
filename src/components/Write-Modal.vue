<template>
    <div class="modal-overlay" v-if="showModal">
        <div class="modal">
            <input v-model="exercise.title" placeholder="운동 이름" class="input-field">
            <input v-model="exercise.time" placeholder="시간" class="input-field">
            <div class="button-group">
                <button @click="submitExercise" class="submit-button">입력완료</button>
                <button @click="closeModal" class="close-button">닫기</button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: ['showModal', 'box'],
    data() {
        return {
            exercise: { title: '', time: '' }
        };
    },
    methods: {
        submitExercise() {
            this.box.exercises.push({ title: this.exercise.title, time: this.exercise.time });
            this.closeModal();
        },
        closeModal() {
            this.$emit('close-modal');
        }
    }
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
    /* width: 1650px; */
    /* height: 900px; */
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
  