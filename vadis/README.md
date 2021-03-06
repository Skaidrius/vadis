# vadisvue

> A Vue.js project

## Internal Audit Planning and Risk Management system
#### ATM:
- Risk Management
- IAS demand calculation
- Recommendations monitoring

1. Choose/write new *Audit scope elements*
2. *Search* any entry and *filter* all rows
3. Analyse **Risk** based on *Risk factor rate* and *value*
4. Calculate **IA staff demand ** based on *individual risk analysis* and assuming that 
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
                vue-router
            Webpack 
    Backend: 
        node.js,
        Express
        JSON //not yet implemented


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

- [x] localization [i18n] - 2 languages (English, Lithuanian)
  - [ ] looking for simple vue solution with dictionary
  - 
- [ ] IA Recomendations Progress Monitoring
- [x] Actual/late/implemented
- [x] Modal / not modal - expanding list with responsible staff and curation
- [ ] Callendar
- [ ] Reminder
- [ ] Send email if not implemented
  - [ ] automatic
  - [ ] manual
- [x] Status
- [ ] add/remove criterias                                
- [ ] add/remove entries                                  
- [x] search entries                                      
- [x] sort data by table header                           
- [x] view mode / edit mode                               

- [ ] IA Strategy

- [ ] IA annual planning 

- [ ] Audit Program

- [ ] Audit Report



#### ToDOs:   
- [ ] AJAX 
- [ ] get/write user data                
- [ ] put i18n data to 1 file by language 

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