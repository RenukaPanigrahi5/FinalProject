<template>
    <div>
        <chartjs-doughnut v-bind:labels="labels"
        v-bind:datasets="datasets" v-bind:option="option">
        ></chartjs-doughnut>
    </div>
</template>
<script>
export default {
    data() {
        return {
            labels: ["Apples", "Bananas", "Grapes"],
            datasets: [
                {   
                  data: [20,30.50],
                  backgroundColor: ["Red", "Yellow", "Purple"]
                }
            ],
            option: {
                title: {
                    display: true,
                    position: "bottom",
                    text: "Fruits"
                }
            }
        };
    }
};
</script>
