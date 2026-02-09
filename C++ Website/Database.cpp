#include <iostream>
#include <sqlite3.h>
#include <vector>
#include "Database.h"




void Database::openDB() {
    detectError = sqlite3_open("YourDBName.db", &DB);
}

void Database::setQuery(const std::string &userQuery){

            if(userQuery == ""){

                query = "SELECT * FROM PERSON LIMIT 1";
            }

            else{
                
                snprintf(buffer,sizeof(buffer),"SELECT * FROM PERSON where name='%s'",userQuery.c_str());

                query = buffer;
            }
}



std::string Database::getQuery() const{

            return query;
        }

void Database::inializeDB(){

            std::string bulidingTB = 
                            "CREATE TABLE PERSON("
                            "ID   INTEGER PRIMARY KEY AUTOINCREMENT, "
                            "NAME           TEXT    NOT NULL, "
                            "SURNAME          TEXT     NOT NULL, "
                            "AGE            INT     NOT NULL, "
                            "ADDRESS        CHAR(50), "
                            "SALARY         REAL );";
            

            if (detectError != SQLITE_OK) {

                std::cerr << "Error creating database and tables " << sqlite3_errmsg(DB) << std::endl;
            }
            
            detectError = sqlite3_exec(DB, bulidingTB.c_str(), NULL, 0, &errorMessage);

            if(detectError == SQLITE_OK && errorMessage == NULL){

                    std::cout << "Database and table created Successfully" << std::endl;
            }

            else{
                std::cout << errorMessage << std::endl;
            }
        
        };

void Database::insertValues(){

        std::string defaultValues =
            "INSERT INTO PERSON (NAME, SURNAME, AGE, ADDRESS, SALARY) VALUES "
            "('STEVE', 'GATES', 30, 'PALO ALTO', 1000.0),"
            "('BILL', 'ALLEN', 20, 'SEATTLE', 300.22),"
            "('PAUL', 'JOBS', 24, 'SEATTLE', 9900.0);";


        detectError = sqlite3_exec(DB, defaultValues.c_str(), NULL, 0, &errorMessage);

        if (detectError != SQLITE_OK) {

            std::cerr << "Error inserting data to dataBase " << errorMessage << std::endl;
        }

        else{
                std::cout << "Inserted data to database Successfully" << std::endl;
        }

}

int Database::holdResultFromDB(void* data,int numberOfResultsFromQuery, char** arrayOfResultsFromQuery, char** columnName){

        std::vector<std::string>* results = static_cast<std::vector<std::string>*>(data);

        for(int i=0; i < numberOfResultsFromQuery; i++){

            if(std::string(columnName[i]) != "ID"){

                results->push_back(arrayOfResultsFromQuery[i]);
            }
    
        }

        return 0;
    }

void Database::readData(std::string &name, std::string &surname, std::string &age , std::string &address , std::string &salary){

        std::vector<std::string> users;

        detectError = sqlite3_exec(DB, getQuery().c_str(),holdResultFromDB, &users, &errorMessage);

            if(detectError != SQLITE_OK){

                std::cout << "Something went wrong " << errorMessage << std::endl;
            }

             
           for (int i = 0; i < users.size(); ++i) {
      
                if (i == 0){

                    name += users[i];
                }

                else if(i == 1){

                    surname += users[i];
                }

                else if(i == 2){

                    age += users[i];
                }

                 else if(i == 3){

                    address += users[i];
                }

                else{
                    
                    salary += users[i];
                }
            }

        }



void Database::closeDB(){

        if (DB) {

            sqlite3_close(DB);

            DB = nullptr;

        }
    }
