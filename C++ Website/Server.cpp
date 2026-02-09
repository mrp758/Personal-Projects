#include "httplib.h"
#include <sqlite3.h>
#include <iostream>
#include <vector>
#include "aDatabase.h"




std::string load_file(const std::string& path) {

        std::ifstream file(path);
        std::stringstream buffer;
        buffer << file.rdbuf();
        return buffer.str();
}


void removeQueryField(std::string body, std::string &extractedValue){

     for(int i=11; i < body.size(); i++){
            extractedValue += body[i];
        }
}

void htmlGenerator(std::string& html, std::string * name, std::string * surname, std::string * age, std::string * address , std::string * salary){

            if(!name->empty()){
                
                html =
                "<!DOCTYPE html>"
                "<html lang='en'>"
                "<link rel='stylesheet' href='/css'>"
                "<head>"
                "<meta charset='UTF-8'>"
                "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                "<title> Result page </title>"
                "</head>"
                "<body>"
                "<h2 id='result-header'>Here is your result :D</h2>"
                "<p>" + *name + "</p>"
                "<p>" + *surname + "</p>"
                "<p>" + *age + "</p>"
                "<p>" + *address + "</p>"
                "<p>" + *salary + "</p>"
                "</body>"
                "</html>";

            }

        else{
               html =
                "<!DOCTYPE html>"
                "<html lang='en'>"
                "<link rel='stylesheet' href='/css'>"
                "<head>"
                "<meta charset='UTF-8'>"
                "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                "<title> Result page </title>"
                "</head>"
                "<body>"
                "<h2 id='result-header'>No result found :()</h2>"
                "</body>"
                "</html>";
        }
}


int main() {


    httplib::Server server;
    
    

    server.Get("/", [&](const httplib::Request&, httplib::Response& res) {
        auto htmlFile = load_file("front-page.html");
        res.set_content(htmlFile, "text/html");
    });

    server.Get("/css", [&](const httplib::Request&, httplib::Response& res) {
        auto cssFile = load_file("astyler.css");
        res.set_content(cssFile, "text/css");
    });


    server.Post("/search", [](const httplib::Request& req, httplib::Response& res) {

        Database dataBaseObject;
        std::string body = req.body;
        std::string userInput;
        removeQueryField(body,userInput);
        

        std::string name, surname, age , address , salary;
        std::string inputToQuery = userInput;
        std::string htmlContent;

        dataBaseObject.openDB();
        dataBaseObject.setQuery(inputToQuery);
        dataBaseObject.readData(inputToQuery,name,surname,age,address,salary);
        dataBaseObject.closeDB();

        htmlGenerator(htmlContent,&name,&surname,&age,&address,&salary);
        res.set_content(htmlContent, "text/html");
        
    });

    server.listen("YOUR IP", "YOUR PORT NUMBER");
}

