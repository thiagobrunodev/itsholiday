<template>
    <div v-if="data" class="holiday">
        <div class="holiday-date">
            <b>
                {{
                    new Date(
                        data.date
                    )
                        .toLocaleDateString("local", {
                            weekday: "short",
                            day: "2-digit",
                            month: "long",
                            timeZone: 'UTC'
                        })
                        .replace(".", "")
                }}
            </b>
            <div class="icons">
                <img
                    v-if="data.fixed"
                    title="Is this public holiday every year on the same date"
                    alt="Fixed"
                    src="../assets/icon-pin.svg"
                />
                <img
                    v-if="data.global"
                    title="Is this public holiday in every county (federal state)"
                    alt="Global"
                    src="../assets/icon-globe.svg"
                />
            </div>
        </div>
        <div class="holiday-name">
            <p>{{ data.localName }}</p>
            <p class="small">{{ data.name }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Holiday',
    props: {
        data: Object,
    },
};
</script>

<style scoped>
.icons {
    display: flex;
}

.icons * {
    height: 20px;
    margin: 0 5px;
}

.holiday {
    padding: 10px;
    margin: 0 20px 15px 20px;
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.1);
    background-color: #50a2e1;
    border: solid 2.5px white;
    border-radius: 25px;
}

.holiday-date {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.holiday-name {
    margin: 15px 0;
}

.holiday-name p {
    margin: 0;
}

.holiday-name .small {
    font-size: 0.65em;
}

@media screen and (max-width: 600px) {
    .holiday {
        margin: 0 50px 15px 50px;
    }
}
</style>
