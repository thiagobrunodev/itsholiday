<template>
<div id="app">
    <a href="/"><h1 class="brand-name">it's holiday.</h1></a>
    <form autocomplete="off" spellcheck="false" class="main-params" @submit.prevent="onSubmit">
        <ParamsInput ref="inputs"/>
        <input type="submit" value="" hidden>
    </form>
    <router-view />
    <p class="credits"><a title='Repository of this project' href='http://github.com/thiaguz/itsholiday'>Made with 💙</a> by
    <a title='My website' href='https://thiaguz.github.io/'>Thiago B. Vieira</a>
    using <a title='Vue.Js' href='https://vuejs.org/'>Vue</a> and
    <a title='Worldwide Public Holidays - Nager.Date' href='https://date.nager.at/'>Nager.Date</a>, art from <a title='unDraw' href='https://undraw.co/'>unDraw</a></p>
</div>
</template>

<script>
export default {
    metaInfo: {
        title: "It's Holiday",
        meta: [
            { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'description', content: 'Show all national holidays.' },

            // OpenGraph data (Most widely used)
            { property: 'og:title', content: 'It\'s Holiday' },
            { property: 'og:site_name', content: 'It\'s Holiday' },
            // The list of types is available here: http://ogp.me/#types
            { property: 'og:type', content: 'website' },
            // Should the the same as your canonical link, see below.
            { property: 'og:url', content: 'https://itsholiday.now.sh/' },
            // Often the same as your meta description, but not always.
            { property: 'og:description', content: 'Show all national holidays.' },

            // Twitter card
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: 'https://itsholiday.now.sh/' },
            { name: 'twitter:title', content: 'It\'s Holiday' },
            { name: 'twitter:description', content: 'Show all national holidays.' },
            // Your twitter handle, if you have one.
            { name: 'twitter:creator', content: '@thiguz' },

            // Google / Schema.org markup:
            { itemprop: 'name', content: 'It\'s Holiday' },
            { itemprop: 'description', content: 'Show all national holidays.' },
        ],
        link: [
            { rel: 'canonical', href: 'https://itsholiday.now.sh/' },
        ],
    },
    components: {
        ParamsInput: () => import('@/components/ParamsInput'),
    },
    methods: {
        onSubmit(e) {
            const { country, year } = e.target;

            if (this.$router.currentRoute.fullPath !== `/${country.value}/${year.value}`) {
                this.$router.push(`/${country.value}/${year.value}`);

                this.$refs.inputs.$refs.countryInput.blur();
                this.$refs.inputs.$refs.yearInput.blur();
            }
        },
    },
};
</script>

<style>
    @font-face {
        font-family: "MontserratAlternates-Regular";
        src: url("../public/fonts/MontserratAlternates-Regular.ttf");
    }

    @font-face {
        font-family: "Montserrat-Regular";
        src: url("../public/fonts/Montserrat-Regular.ttf");
    }

    @keyframes showApp{
        0% {
            opacity: 0;
            border-radius: 50vw;
            transform: scale(0);
        }
        100% {
            opacity: 1;
            border-radius: 0;
            transform: scale(1);
        }
    }

    body {
        background-color: #50A2E1;
        margin: 0; padding: 0;
    }

    a {
        color: white;
        text-decoration: none;
    }

    #app {
        animation: showApp 200ms 1 1s ease-out;
        animation-fill-mode: forwards;
        animation-delay: 500ms;
        position: relative;
        font-family: 'MontserratAlternates-Regular', Arial, Helvetica, sans-serif;
        padding: 50px;
        box-sizing: border-box;
        color: white;
        opacity: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #50A2E1;
        background-image: url('./assets/undraw-background-illustration.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 100%;
        width: 100vw; height: 100vh;
        min-height: 500px;
    }

    .main-params {
        margin-bottom: 10vh;
    }

    .brand-name {
        font-size: 5em;
    }

    .credits {
        position: absolute;
        bottom: 0;
        font-size: 1em;
        font-family: 'Montserrat-Regular', Arial, Helvetica, sans-serif;
        text-align: center;
        padding: 0 50px;
    }

    .credits a:hover {
        text-decoration: underline;
    }

    @media screen and (max-width: 600px) {
        .main-params {
            width: 100%;
        }
    }

    @media screen and (max-width: 420px) {
        .brand-name {
            font-size: 20vw;
        }
    }

    @media screen and (max-height: 680px) {
        .brand-name {
            margin: 0 0 20px 0;
        }
    }

    @media screen and (max-height: 600px) and (max-width: 550px) {
        #app {
            height: auto;
        }
        .credits {
            font-size: .7em;
        }
    }
</style>
