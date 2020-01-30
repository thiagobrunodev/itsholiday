<template>
<WorldLoading v-if="loading" />
<Carousel :speed="750" class="holidays" :perPageCustom="[[0, 1], [600, 2], [768, 3], [1024, 4], [1600, 6]]" :paginationActiveColor="'rgba(255,255,255,.5)'" :paginationColor="'rgba(0,0,0,.1)'" v-else>
    <Slide :key="holiday.localName + holiday.date" v-for="holiday in holidays">
        <Holiday :data=holiday />
    </Slide>
</Carousel>
</template>

<script>
import {
    Carousel,
    Slide,
} from 'vue-carousel';

import api from '../api';

export default {
    name: 'Holidays',
    components: {
        WorldLoading: () => import('@/components/WorldLoading'),
        Holiday: () => import('@/components/Holiday'),
        Carousel,
        Slide,
    },
    created() {
        this.getHolidays();
    },
    watch: {
        $route: 'getHolidays',
    },
    methods: {
        getHolidays() {
            this.loading = true;
            api.get(`/PublicHolidays/${this.$route.params.year}/${this.$route.params.country}`)
                .then((res) => {
                    if (typeof res.data === typeof []) {
                        this.holidays = res.data;
                    }
                }).catch(() => {
                    // Trigger error page
                }).finally(() => {
                    this.loading = false;
                });
        },
    },

    data() {
        return {
            loading: true,
            holidays: [],
        };
    },
};
</script>

<style>
.VueCarousel-dot-container {
    margin: 0 !important;
}

.VueCarousel-dot {
    margin: 0 !important;
}

.holidays {
    width: 100vw;
}

.WorldLoading {
    width: 25%;
    max-width: 200px;
}
</style>
