<template>
    <div class="params-input">
        <div class="country">
            <input
                placeholder="Select a country"
                :value="countryInput"
                @input="evt=>countryInput=evt.target.value"
                @focus="clearCountryInput"
                ref="countryInput"
                pattern="[A-Za-z].{2,}"
                type="text"
                required
                title="Just letters"
                class="country-input"
                autocomplete="off"
            />
            <input hidden type="text" name="country" id="country" :value="bestMatchCountry.key">
            <div v-if="countryInput && matchedCountries && matchedCountries.length > 1" class="country-dropdown">
                <ul class="matched-country-list">
                    <li
                        class="matched-country"
                        v-for="matchedCountry in matchedCountries"
                        :key="matchedCountry.key"
                        v-on:click="setBestMatchCountry(matchedCountry)"
                    >
                        {{matchedCountry.value}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="year">
            <input
                placeholder="Year"
                v-model="year"
                required
                type="number"
                class="year-input"
                name="year"
                id="year"
                ref="yearInput"
                min=2000
                max=2100
            />
        </div>
    </div>
</template>

<script>
import api from '../api';

export default {
    name: 'ParamsInput',
    beforeMount() {
        document.addEventListener('click', () => {
            this.matchedCountries = null;
        });

        api.get('/AvailableCountries').then((res) => {
            if (typeof res.data === typeof []) {
                this.countryDictionary = res.data;
            }
        }).catch(() => {
            // Trigger error page
        });
    },
    watch: {
        countryInput() {
            this.matchedCountries = this.matchCountry(this.countryInput);

            if (this.matchedCountries && this.matchedCountries.length === 1) {
                this.setBestMatchCountry(this.matchedCountries[0]);
            }
        },
    },
    methods: {
        clearCountryInput(event) {
            if (!event) return;
            if (this.bestMatchCountry.key !== undefined) {
                this.bestMatchCountry = { };
                this.countryInput = '';
            }
        },
        matchCountry(country) {
            return this.countryDictionary.filter((el) => el.value.toLowerCase().includes(country.toLowerCase()));
        },
        setBestMatchCountry(country) {
            if (this.countryInput !== country.value) {
                this.countryInput = country.value;
                this.$refs.yearInput.focus();
                this.$refs.countryInput.disabled = true;
                setTimeout(() => { this.$refs.countryInput.disabled = false; }, 500);
                return;
            }
            this.bestMatchCountry = country;
        },
    },
    data() {
        return {
            countryDictionary: [],
            matchedCountries: [],
            bestMatchCountry: {},
            countryInput: '',
            year: new Date().getUTCFullYear(),
        };
    },
};
</script>

<style scoped>
.params-input {
    font-family: "Montserrat-Regular", Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 300px;
}

.country,
.year {
    position: relative;
    font-size: 1.1em;
}

.country-input,
.year-input {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    border: none;
    margin: 0;
    z-index: 10;
    outline: none;
    height: 50px;
}

.year-input {
    padding-left: 15%;
    z-index: 0;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
}

.country-input {
    background-image: url("../assets/icon-feather-chevron-down.svg");
    background-repeat: no-repeat;
    background-position: 8% 50%;
    background-size: 8%;
    padding-left: 18%;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.country-dropdown {
    position: absolute;
    background: white;
    color: black;
    z-index: 5;
    width: 90%;
    right: 0;
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
    padding: 15px 25px;
    box-sizing: border-box;
    max-height: 35vh;
    overflow-y: auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.country-dropdown::-webkit-scrollbar {
    width: 5px;
}

.country-dropdown::-webkit-scrollbar-track {
    box-shadow: transparent;
}

.country-dropdown::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.country-dropdown::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.4);
}

.matched-country-list {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}

.matched-country {
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 15px;
}

.matched-country:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

@media screen and (max-width: 600px) {
    .params-input {
        flex-direction: column;
        max-width: none;
    }

    .country-dropdown {
        width: 100%;
    }

    .country-input,
    .year-input {
        border: none;
        text-align: center;
        padding: 0 54px;
    }

    .country-input {
        border-radius: 20px 20px 0 0;
    }

    .year-input {
        border-radius: 0 0 20px 20px;
    }
}
</style>
