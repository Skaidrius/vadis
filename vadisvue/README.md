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
7. Select between *two languages En/Lt*


#### used techniques and technologies: 
    Frontend: 
        html,
        CSS,
            frameworks:
                Bootstrap 3,
        Javascript - ES6/ES2015(Babel), 
            frameworks:
                vue.js,
            Webpack 
    Backend: 
        node.js,
        Express
        JSON


#### Done: 
- [ ] Demand
- [x] add/remove criterias                                
- [x] add/remove entries                                  
- [x] search entries                                      
- [x] sort data by table header                           
- [x] view mode / edit mode                               
- [x] removeRow drops error trying remove last element    
- [x] modal creating risk factors with description

- [ ] Risk Selection
- [x] add/remove risk factors                             
- [x] add/remove entries                                  
- [x] search entries                                      
- [x] sort data by table header                           
- [x] view mode / edit mode                               
- [x] removeRow drops error trying remove last element    
- [x] modal creating criterias with description

- [x] localization - 2 languages (English, Lithuanian)
  - [ ] looking for simple vue solution with dictionary
  - 
- [ ] IA Recomendations Progress Monitoring
- [ ] Callendar
- [ ] Reminder
- [ ] Status
- [ ] add/remove criterias                                
- [ ] add/remove entries                                  
- [ ] search entries                                      
- [ ] sort data by table header                           
- [ ] view mode / edit mode                               

- [ ] IA Strategy

- [ ] IA annual planning 


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