<script lang="ts" setup>

</script>

<template>
    <header>
        <nav class="z-50 w-full fixed bg-black py-3">
            <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                <div class="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
                    <input id="toggle_nav" aria-hidden="true" class="hidden peer" name="toggle_nav" type="checkbox">
                    <div class="relative z-20 w-full flex justify-between lg:w-max md:px-0">
                        <RouterLink aria-label="logo" class="flex space-x-2 items-center" to="/">
                            <div aria-hidden="true" class="flex space-x-1">
                                <img alt="HairDresser Logo" class="h-20 mr-3 sm:h-9" src="@/assets/images/logo.webp">
                            </div>
                            <span class="text-2xl font-bold text-white dark:text-white">HairDresser</span>
                        </RouterLink>

                        <div class="relative flex items-center lg:hidden max-h-10">
                            <label id="hamburger" aria-label="humburger" class="relative  p-6 -mr-6" for="toggle_nav"
                                   role="button">
                                <div id="line" aria-hidden="true"
                                     class="m-auto h-0.5 w-5 rounded bg-white transition duration-300"></div>
                                <div id="line2" aria-hidden="true"
                                     class="m-auto mt-2 h-0.5 w-5 rounded bg-white transition duration-300"></div>
                            </label>
                        </div>
                    </div>
                    <div aria-hidden="true"
                         class="fixed z-10 inset-0 h-screen w-screen bg-black/70 backdrop-blur-2xl origin-bottom scale-y-0 transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden dark:bg-gray-900/70"></div>
                    <div
                        class="flex-col z-20 flex-wrap gap-6 p-8 rounded-3xl border border-gray-100 bg-black shadow-2xl shadow-gray-600/10 justify-end w-full invisible opacity-0 translate-y-1  absolute top-full left-0 transition-all duration-300 scale-95 origin-top lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none dark:shadow-none dark:bg-gray-800 dark:border-gray-700">

                        <div class="text-white dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
                            <ul class="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                                <li>
                                    <RouterLink class="text-lg block md:px-4 transition hover:text-[#d1b096]" to="/">
                                        <span>Accueil</span>
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="text-lg block md:px-4 transition hover:text-[#d1b096]"
                                                to="/products">
                                        <span>Boutique</span>
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="text-lg block md:px-4 transition hover:text-[#d1b096]"
                                                to="abouts">
                                        <span>A propos</span>
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink class="text-lg block md:px-4 transition hover:text-[#d1b096]"
                                                to="login">
                                        <span>Se connecter</span>
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>

                        <div class="mt-12 lg:mt-0">
                            <RouterLink class="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-[#d1b096] before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                                        to="/">
                                <span class="relative text-sm font-semibold text-white">Prendre un Rendez-vous</span>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped>

</style>
