<template>

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
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
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