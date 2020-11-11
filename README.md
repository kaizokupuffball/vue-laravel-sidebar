# vue-laravel-sidebar

![](https://img.shields.io/npm/dw/vue-laravel-sidebar) ![](https://img.shields.io/npm/v/vue-laravel-sidebar?color=#00baff)

Very simple to use Vue single-file-component that creates a darker sidebar based on the navigation data given to it.

  

## Requirements

[Laravel](https://laravel.com) <br />


## Installing

`npm install vue-laravel-sidebar`<br />
Register the component in your Vue setup.

  

## Usage

Example:

```js
import VueLaravelSidebar from './VueLaravelSidebar';
const app = new Vue({
    el: '#app',
    components: {
    	VueLaravelSidebar
    }
});
```


```html
<div id="app">
    <vue-laravel-sidebar :nav-data="[
      { 
        text: 'Home', 
        url: '/', 
        dropdown: false, 
        icon: 'fas fa-fw fa-tachometer-alt'
      },
      { 
        text: 'Items', 
        url: '#',  
        icon: 'fas fa-fw fa-database',
        dropdown: [
          {
            text: 'Item 1',
            url: '/item-1'
          }, {
            text: 'Item 2',
            url: '/item-2'
          }
        ],
      }
    ]" />
</div>
```

  ***Although I would consider using a View Composer to generate the navigation data.***


## Parameters:

-  **Array** `:nav-data`  ***Required***
   - Pretty self explanatory. Pass the navigation data array here. See example above.




## Other stuff

The component is styled using BS4 classes and fontawesome classes. Remember to install or use BS4 and fontawesome so the component actually looks nice.

