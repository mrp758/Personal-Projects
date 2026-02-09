#pragma once

#include <string>
#include <vector>
#include <sqlite3.h>

class Database {
public:
    void openDB();
    void setQuery(const std::string &userQuery);
    std::string getQuery() const;

    void inializeDB();
    void insertValues();
    void readData(std::string &name, std::string &surname, std::string &age , std::string &address , std::string &salary);
    void closeDB();

private:
    static int holdResultFromDB(void* data, int numberOfResultsFromQuery,
                                char** arrayOfResultsFromQuery, char** columnName);

    sqlite3 *DB = nullptr;
    int detectError = 0;
    char* errorMessage = nullptr;
    char buffer[50];
    std::string query;
};
