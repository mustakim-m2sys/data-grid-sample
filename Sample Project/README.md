# CloudApper Web Client Architecture

## **UI Layer**

### _Files_ : example.component.ts , example.component.html

### _Location_ : CloudApperClient/src/app/

### _Responsiblities_ :

    1. Call local state query to fetch data and render to view files.
    2. Get data from view files and pass it to service layer.
    3. Call service layer methods.

## **Business Layer**

### _Files_ : example.service.ts

### _Location_ : CloudApperClient/src/app/core/services

### _Responsiblities_ :

    1. It is the core layer of the app where we implement business logics.
    2. Call data services method for API calling.
    3. SET/UPDATE local state.

## **Data Layer**

### _Files_ : example.data.service.ts

### _Location_ : libs/data-service/src/lib

### _Responsiblities_ :

    1. Call APIs and return responses.

# CloudApper Web Client Folder Structure

Upcoming ....

# Standard Coding Rules :

    1. To seperate common methods/properties always use region blocks.
    2. If you have long code blocks its better to move them in seperate file like : example.helper.ts
    3. Never write inline css and always use bootstrap utilities class rather than writing own custom class for simple css tasks like margin,padding etc.
    See point 1 in resources.
    4. Use '$' sign at the end of name of any async methods/properties. Example: getUsers$

# Resources :

1. [Bootstrap Utilities Class](https://getbootstrap.com/docs/4.1/utilities)
