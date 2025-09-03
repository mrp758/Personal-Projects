#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <dirent.h>




void c_echo(char * userInput);
void c_whoami();
void c_mkdir(char * folderName);
void c_rmdir(char * folderName);
void c_ls();
void c_pwd(char * currentDirectory);
void c_cd(char * changeDirInput, char * currentDirectory);
void c_touch(char * fileName);
void c_cat(char * fileName);
void c_cp(char * userInput);
void c_rm(char * userInput);
int c_arrayOfFiles(char * userInput, char (*fileNames)[50]);
void c_clear();
void c_exit();
void c_split(char * userInput, char * soruceFile, char * targetFile);
void c_edit(char * fileName);

int main(){


    char input[256];
    char shell[10];
    char commandArgs[256];
    char currentDir[90];
    int index = 0;
    printf("Write your input here: ");
    fgets(input,256,stdin);


    for(int i=0; i < strlen(input); i++){
        shell[i] = input[i];
        if(input[i] == ' ' || input[i] == '\n'){
            shell[i] = '\0';
            break;
        }
    }
 
    for(int j=strlen(shell)+1; j < strlen(input)+1; j++){
        commandArgs[index] = input[j];
        index++;
   }

   shell[strcspn(shell, "\n")] = '\0';
   commandArgs[strcspn(commandArgs, "\n")] = '\0';

   while(1){

        if(strcmp(shell,"echo")==0){
            c_echo(commandArgs);
            main();
        }
        else if(strcmp(shell,"mkdir")==0){
            c_mkdir(commandArgs);
            main();
        }
        else if(strcmp(shell,"rmdir")==0){
            c_rmdir(commandArgs);
            main();
        }
        else if(strcmp(shell,"ls")==0){
            c_ls();
            main();
        }
        else if(strcmp(shell,"pwd")==0){
            c_pwd(currentDir);
            main();
        }
        else if(strcmp(shell,"cd")==0){
            c_cd(commandArgs,currentDir);
            main();
        }
        else if(strcmp(shell,"touch")==0){
            c_touch(commandArgs);
            main();
        }
        else if(strcmp(shell,"whoami")==0){
            c_whoami();
            main();
        }
        else if(strcmp(shell,"cat")==0){
            c_cat(commandArgs);
            main();
        }
        else if(strcmp(shell,"clear")==0){
            c_clear();
            main();
        }
        else if(strcmp(shell,"exit")==0){
            c_exit();
            main();
        }
        else if(strcmp(shell,"cp")==0){
            c_cp(commandArgs);
            main();
        }
        else if(strcmp(shell,"rm")==0){
            c_rm(commandArgs);
            main();
        }
        else if(strcmp(shell,"edit")==0){
            c_edit(commandArgs);
            main();
        }
        else{
            printf("Command is not found");
            main();
        }
    }
    
    return 0;
}


void c_split(char * userInput, char * sourceFileName, char * targetFileName){

    int parseStage = 0, srcIndex = 0, targetIndex = 0;


    
    for(int i=0; i < strlen(userInput); i++){

        if(parseStage  == 0){
            
            if(userInput[i] == ','){
                sourceFileName[srcIndex] = '\0';
                parseStage = 1;
            }

            else if(userInput[i] != '{'){
                sourceFileName[srcIndex++] = userInput[i];
            }
        }

        else if(parseStage == 1){

            if(userInput[i] == '}'){
                targetFileName[targetIndex] = '\0';
                parseStage = 2;
            }

            else if(userInput[i] != ',' || userInput[i] != '}'){
                targetFileName[targetIndex++] = userInput[i];
            }
        }

    }

}



int c_arrayOfFiles(char * userInput,char (*fileNames)[50]) {
    int indexTemp = 0,indexName = 0;
    char * LocateClosingBrakcet = strrchr(userInput,'}');

    if(userInput[0] != '{' && LocateClosingBrakcet==NULL){

        for (int item = 0; item < strlen(userInput); item++) {
            if (userInput[item] == ' ') {
                fileNames[indexName][indexTemp] = '\0';
                indexName++;
                indexTemp = 0;
                break;
            }
            
            else {
                fileNames[indexName][indexTemp++] = userInput[item];
            }
        }
    }

    else{
        for (int item = 0; item < strlen(userInput); item++) {

            if (userInput[item] == '{' || userInput[item] == '}') {
                continue;

            } 
            
            else if (userInput[item] == ',') {
                fileNames[indexName][indexTemp] = '\0'; 
                indexName++;
                indexTemp = 0;
            } 
            
            else {
                fileNames[indexName][indexTemp++] = userInput[item];
            }
        }
    }

    fileNames[indexName][indexTemp] = '\0';
    return indexName + 1;

}




void c_echo(char * userInput){
    printf("%s",userInput);
}

void c_mkdir(char * folderName){
    folderName[strcspn(folderName, "\n")] = '\0';
    mkdir(folderName);
}



void c_rmdir(char * folderName){
        if (access(folderName, F_OK) == 0) {
            folderName[strcspn(folderName, "\n")] = '\0';
            rmdir(folderName);
        } 
        else {
            perror("Folder doesn't exists!");
        }
    
    
}


void c_rm(char * userInput){

    char fileNames[50][50] = {0};
    int numOfFiles = c_arrayOfFiles(userInput, fileNames);

    for(int i=0; i < numOfFiles; i++){
        if (remove(fileNames[i]) == 0) {
            printf("Deleted %s successfully.\n", fileNames[i]);
        }
        else {
            perror("Error deleting file");
        }
    }
}

void c_ls(){
    struct dirent *de;  
    DIR *dr = opendir(".");
    if (dr == NULL)
    {
        perror("Error:");
    }
  else{
    while ((de = readdir(dr)) != NULL){
        printf("%s\n", de->d_name);
    }
    closedir(dr);
  }
}


void c_pwd(char * currentDirectory){
    printf("%s\n", getcwd(currentDirectory,90));
}

void c_cd(char * changeDirInput,char * currentDirectory){
    size_t size;

    if (chdir(changeDirInput) != 0) {
        perror("chdir failed");
    }

    else{

        printf("%s\n",getcwd(currentDirectory,90));
    }
}


void c_touch(char * fileName){

        FILE * fpointer;
        if(access(fileName,F_OK) == 0){
        printf("ERROR: File exists in the system!");
        fclose(fpointer);
    }
    else if(strcmp(fileName,"")==0){
        printf("ERROR: FileName cannot be NULL/Empty string!");
        fclose(fpointer);
    }
    else{
        fpointer = fopen(fileName,"w");
        fprintf(fpointer,"");
        fclose(fpointer);
    }
}

void c_whoami(){
    printf("%s\n", getenv("USERNAME"));

}


void c_cp(char * userInput){

            char  sourceFileName[256] = {0}, targetFileName[256] = {0}, tempStore[256];
            c_split(userInput, sourceFileName, targetFileName);

            if(access(sourceFileName,F_OK)==0){

                FILE * sourceFile, * targetFile;


                sourceFile = fopen(sourceFileName,"r");
                targetFile = fopen(targetFileName,"w");

                size_t bytes;
                while ((bytes = fread(tempStore, 1, sizeof(tempStore), sourceFile)) > 0) {
                    fwrite(tempStore, 1, bytes, targetFile);
                }
            


            fclose(sourceFile);
            
            fclose(targetFile);
        }

        else{
            perror("File doesn't exists!");
        }
            
    
}


void c_edit(char * fileName){

    char userInput[50], charOption[3];
    int option = 0;
    FILE * fpointer;
    printf("Please select option: 1 - overwrite entire file, 2 - append new data to file ");
    fgets(charOption, sizeof(charOption), stdin);
    option = atoi(charOption);

    if(access(fileName,F_OK) == 1){

        perror("File doesn't exists!");
        fclose(fpointer);
    }
    else if(option == 1){

       fpointer = fopen(fileName , "w");
       printf("Write to the file: ");
       fgets(userInput,50,stdin);
       userInput[strcspn(userInput, "\n")] = '\0';
       fprintf(fpointer,"%s ", userInput);
       fclose(fpointer);
    }
    else{

        fpointer = fopen(fileName , "a");
        printf("Write to the file: ");
        fgets(userInput,50,stdin);
        userInput[strcspn(userInput, "\n")] = '\0';
        fprintf(fpointer," %s", userInput);
        fclose(fpointer);
    }

}


void c_cat(char * fileName){
        char tempStore[256];
        if (access(fileName, F_OK) == 0) {
             FILE * fpointer = fopen(fileName,"r");
                while (fgets(tempStore, sizeof(tempStore), fpointer)) {
                    printf("%s", tempStore);
                };
            fclose(fpointer);
        }
        else{
            perror("File doesn't exists!");
        }
}


void c_clear(){
   #if defined(_WIN32)
        system("cls");
    #else
        system("clear");
    #endif

}

void c_exit(){
    exit(0);
}


