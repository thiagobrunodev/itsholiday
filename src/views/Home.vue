<template>
    <p class="home">
        A holiday is a day set aside by custom or by law on which normal activities, especially
        business or work including school, are suspended or reduced.
    </p>
</template>

<style scoped>
.home {
    max-width: 850px;
    text-align: center;
    font-family: "Montserrat-Regular", Arial, Helvetica, sans-serif;
    line-height: 1.5em;
}

@media screen and (max-width: 600px) {
    .home {
        display: none;
    }
}
</style>

<script>
export default {
    name: 'home',
};
</script>
