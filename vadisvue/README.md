# vadisvue

> A Vue.js project

## Internal audit planning and risk selection system
#### It lets:
1. Choose/write new Audit scope elements
2. Perform Risk analysis based on Risk factor rate and value
3. Perform IA staff demand calculation based on Risk analysis and assuming that 
whole internal control system should be checked at least once per 3 years.
4. Risk factors/Demand risk analysis criterias and audit scope entries could be added/modified/removed
5. Read mode and Full Edit modes


#### used techniques and technologies: 
    Frontend: 
        html - html5,
        CSS - CSS 3,
            framework Bootstrap 3,
        Javascript - ES6, 
            frameworks:
                vue.js
                vue-resource
                vue-router,
            Webpack 
    Backend: 
        node.js,
        Express
        Json


##Done: 
> Demand
>   add/remove criterias                                // done
>   add/remove entries                                  // done
>   search entries                                      //done
>   sort data by table header                           //done
>   view mode / edit mode                               //done
>   removeRow drops error trying remove last element    //done
>   modal creating risk factors with description

>  Risk selection
>   add/remove risk factors                             // done
>   add/remove entries                                  // done
>   search entries                                      //done
>   sort data by table header                           //done
>   view mode / edit mode                               //done
>   removeRow drops error trying remove last element    //done
>   modal creating criterias with description

##ToDOs   
>  AJAX get/write user data                PENDING...

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
author: Skaidrius
e-mail: skaidrius@gmail.com