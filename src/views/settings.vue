<template>
<div id="back">
<div id="back-round">
    <!-- <div class="t"><p>태현이 자리</p></div> -->
        <!-- <div class="line"></div> -->
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
</template> 

<script>
import axios from 'axios';

export default {
data() {
    return {
    model: true,
    routines: [],
    };
},
mounted() {
    this.fetchRoutineData();
},
methods: {
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
                accVisibility: this.model ? 1 : 0,
            });

            console.log('Update success:', response.data);

        } catch (error) {
            // console.error('Error updating account visibility', error);
            if (error.response) {
      console.error('Server responded with error status:', error.response.status);
      console.error('Error details:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message);
    }
        }
    },
},
};
</script>

<style>
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
    margin-left:30px;
    margin-top: 20px;
    margin-bottom: 20px;
    color: white;
    font-size: 30px;
    font-weight: bold;
}

.myroutine-text {
    color: white;
    font-size: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left:30px;
    font-weight: bold;
}

.open-switch {
    display: flex;
    align-items: center;
    margin-left: auto
}

.v-switch {
    margin-left: 1000px;
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