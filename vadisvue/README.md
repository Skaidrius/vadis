# vadisvue

> A Vue.js project

## Internal audit planning and risk selection system
#### ATM It lets:
1. Choose/write new *Audit scope elements*
2. *Search* any entry and *filter* all rows
3. Perform **Risk analysis** based on *Risk factor rate* and *value*
4. Perform **IA staff demand calculation** based on *individual risk analysis* and assuming that 
whole internal control _system should be checked at least once per 3 years_.
5. *Risk factors/Demand risk analysis* criterias and audit scope entries could be _added/modified/removed_
6. *Read mode* and *Edit (edit whole table entries, languages etc...)* modes


#### used techniques and technologies: 
    Frontend: 
        html - html5,
        CSS - CSS 3,
            frameworks:
                Bootstrap 3,
        Javascript - ES6, 
            frameworks:
                vue.js
                vue-resource
                vue-router,
            Webpack 
            Babel
    Backend: 
        node.js,
        Express
        Json


#### Done: 
- [ ] Demand
- [x] add/remove criterias                                
- [x] add/remove entries                                  
- [x] search entries                                      
- [x] sort data by table header                           
- [x] view mode / edit mode                               
- [x] removeRow drops error trying remove last element    
- [x] modal creating risk factors with description

- [ ] Risk selection
- [x] add/remove risk factors                             
- [x] add/remove entries                                  
- [x] search entries                                      
- [x] sort data by table header                           
- [x] view mode / edit mode                               
- [x] removeRow drops error trying remove last element    
- [x] modal creating criterias with description

#### ToDOs:   
- [ ] AJAX 
- [ ] get/write user data                

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
author: [Skaidrius](mailto:skaidrius@gmail.com)