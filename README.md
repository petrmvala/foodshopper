# foodshopper
An application to plan your grocery shopping based on your nutritional demands.

## database docker image used:
[postgres docker official image](https://hub.docker.com/_/postgres)

## H2 in memory database:
To access the H2 db console visit http://localhost:8080/h2-console after running backend application. 

#### related links
- [H2 database tutorial at baeldung](https://www.baeldung.com/spring-boot-h2-database)

## importing the nutrient database
The database can be downloaded from https://www.nutridatabaze.cz/en/
And if I understand the licencing correctly
we should be ok if we do not share the db 
(including in here on git) and each time we display 
information from this db we display a clickable link
to the http://www.nutridatabaze.cz/ at the same time.

note: the database from there is in "ANSI" or 
"Eastern Europe (Windows-1250/WinLatin2)" encoding
and need to be converted to some of the UTF encoding 
for proper displaying of characterset
