<template>

    <div id="sidebar" class="sidebar">

        <div class="nav-wrapper">
            <ul class="nav flex-column">
                <li v-for="item in nav" class="nav-item">
                    <template v-if="item.dropdown">
                        <a :href="item.url" v-on:click="toggleDropdown($event)" :class="['nav-link', 'dropdown-toggle']">
                            <i v-if="item.icon" :class="item.icon"></i>{{ item.text }}
                        </a>
                    </template>
                    <template v-else>
                        <a :href="item.url" :class="['nav-link']">
                            <i v-if="item.icon" :class="item.icon"></i>{{ item.text }}
                        </a>
                    </template>
                    <ul v-if="item.dropdown" class="dropdown-nav list-unstyled">
                        <li v-for="subItem in item.dropdown" class="nav-item">
                            <a :href="subItem.url" class="nav-link">
                                <i class="far fa-fw fa-circle"></i>{{ subItem.text }}
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

    </div>

</template>

<script>
    export default {
        name: 'vue-laravel-sidebar',
        props: {
            navData: {
                type: Array,
                required: true
            }
        },
        
        data: function() {
            return {
                nav: this.navData
            }
        },

        mounted() {
            this.setActive();
        },

        methods: {

            /**
             * This method will set the nav-link state to active if it matches
             * the url passed to the method. We are passing window.location.href
             * by default
             */
            setActive(url = window.location.href) {

                // Regex to match URL
                var urlRegExp = new RegExp(url.replace(/\/$/,'') + "$");

                // All the navigation links in the sidebar
                var navigationLinks = document.querySelectorAll('.sidebar .nav-link');

                // Foreach navigation link, we check and test if the regex
                // matches the url, and if it does we can set the state
                // of the nav-link to active
                for(const [k, v] of Object.entries(navigationLinks)) {
                    if (urlRegExp.test(v.href.replace(/\/$/, ''))) {
                        var activeLink = v;
                        activeLink.classList.add('active');
                    }
                }

                // When we're already setting a active state to a link,
                // we also check if the link is inside a .dropdown-nav
                // so we can add the .show class to that dropdown-nav
                this.has('.dropdown-nav', '.active').forEach(active => {
                    active.closest('.dropdown-nav').classList.add('show');
                });

            },

            /**
             * Vanilla JS equivalent of jQuey .has()
             */
            has(selector, sub) {
                const matches = Array.from(document.querySelectorAll(selector));
                return matches.filter(match => match.querySelector(sub) !== null);
            }, 

            /**
             * Toggle dropdown menus when this is called
             */
            toggleDropdown(event) {
                event.preventDefault();
                event.target.classList.contains('dropdown-toggle') && event.target.nextElementSibling.classList.toggle('show');
            }

        }
    }
</script>

<style scoped lang="scss">

    // The total width of the sidebar
    $sidebarWidth:250px;

    // This is the primary color scheme.
    // We use lighten and darken to get the colors we
    // need for the sidebar
    $colorSchemePrimary:#262a2f;

    // This is colors for a .active link
    $activeBackgroundColor:linear-gradient(160deg, #00c7db 0%, #eaa2e5 120%);
    $activeColor:#fff;

    // Global font-size should be 1rem
    $fontSize:1rem;

    .sidebar {
        background:$colorSchemePrimary;
        width:$sidebarWidth;
        position:absolute;
        font-size:$fontSize;
        top:0; left:0;
        height:100%;

        ul {
            .nav-item {
                .nav-link {
                    display:block;
                    color:lighten($colorSchemePrimary, 60%);
                    text-decoration:none;
                    padding:10px;
                    text-shadow:0 2px rgba(0, 0, 0, .25);
                    transition:color .2s ease-in-out;

                    &.active {
                        background:$activeBackgroundColor;
                        color:$activeColor;
                    }

                    &:focus, &:hover {
                        color:#fff;
                    }

                    &.dropdown-toggle::after {
                        display:none;
                    }

                    i {
                        font-size:$fontSize - .1rem;
                        margin-right:10px;
                        position:relative;
                        top:-1px;
                    }
                }   
            
                .dropdown-nav {
                    max-height:0;
                    overflow:hidden;
                    background:darken($colorSchemePrimary, 5%);
                    transition:max-height .2s ease-in-out;

                    &.show {
                        max-height:100px;
                    }

                    .nav-item {
                        .nav-link {
                            font-size:$fontSize - .1rem;
                            padding-left:25px;

                            i {
                                font-size:$fontSize - .4rem;
                                top:-1px;
                            }
                        }
                    }
                }
            }
        }
    }
    
</style>