<template>
    <WorldLoading v-if="loading" />
    <Carousel
        :speed="750"
        class="holidays"
        :perPageCustom="[
            [0, 1],
            [600, 2],
            [768, 3],
            [1024, 4],
            [1600, 6]
        ]"
        :paginationActiveColor="'rgba(255,255,255,.5)'"
        :paginationColor="'rgba(0,0,0,.1)'"
        v-else
    >
        <Slide :key="holiday.localName + holiday.date" v-for="holiday in holidays">
            <Holiday :data="holiday" />
        </Slide>
    </Carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import Swal from 'sweetalert2';
import router from '@/router';

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
            if (!(this.$route.params.year && this.$route.params.country)) {
                router.push('/');
            } else {
                this.loading = true;
                api.get(`/PublicHolidays/${this.$route.params.year}/${this.$route.params.country}`)
                    .then((res) => {
                        if (typeof res.data === typeof []) {
                            this.holidays = res.data;
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Not found!',
                            text: 'We could not find the country or year in our database',
                            showConfirmButton: false,
                            timer: 4000,
                            timerProgressBar: true,
                        });
                        router.push('/');
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
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
.swal2-container {
    font-family: "Montserrat", Arial, Helvetica, sans-serif;
}

.holidays {
    width: 100vw;
    animation: appear 200ms 1 0s ease-in;
}

.WorldLoading {
    width: 25%;
    max-width: 200px;
    animation: appear 200ms 1 0s ease-in;
}

@keyframes appear {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
</style>
