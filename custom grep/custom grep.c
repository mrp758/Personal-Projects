#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MAX_CHARS 256
#define MAX_WORDS 10



char readFile(char ** tempStore,char* fileName);
char arrayOfStrings(char * stringsFromFile, char array[][MAX_CHARS]);
char returnStrings(int indexPosition,char content[][MAX_CHARS], char * foundStrings[], char * phrase);
char returnStringsViaSpecialChars(int indexPosition,char content[][MAX_CHARS], char * foundStrings[], char * phrase);


// This is ANSI usage in C
// printf("\033[31mYour text here\033[0m"); // - red color
//  printf("\033[32mHello, World\033[0m\n");  // - Green
//  printf("\033[34mThis text is blue\033[0m\n"); // - Blue


int main(){

    char content[MAX_WORDS][MAX_CHARS] = {0};
    char fileName[] = "grep_test.txt";
    char phrase[] = "!";
    char * tempStore = NULL;
    char * foundStrings[MAX_CHARS] = {0};
    readFile(&tempStore,fileName);
    int indexPosition = arrayOfStrings(tempStore,content);
    int indexStr = 0, match=0, lastPos=0, lengthOfPhrase = strlen(phrase);
    returnStrings(indexPosition,content,foundStrings,phrase);
    returnStringsViaSpecialChars(indexPosition,content,foundStrings,phrase);
    free(tempStore);
    
    
  
    return 0;
}




char readFile(char ** readContents,char * fileName){

    FILE * file;

    size_t bytesRead;


    *readContents =  (char*)malloc(255 * sizeof(char));

    file = fopen(fileName,"r");

    if(file == NULL){

        perror("Can't open file, Check if file in the same directory/exsists");
    }


    bytesRead = fread(*readContents, 1, 254, file);

    (*readContents)[bytesRead] = '\0';
      
    fclose(file);

    return 0;
}



char arrayOfStrings(char * stringsFromFile, char array[][MAX_CHARS]){
    int indexStr=0,indexPost=0;
    for(int index=0; index < strlen(stringsFromFile); index++){
        if(stringsFromFile[index] == '\n'){
            array[indexPost][indexStr] = '\0';
            indexStr=0;
            indexPost++;
            continue;
        }
        array[indexPost][indexStr] = stringsFromFile[index];
        indexStr++;
    }
    

    return indexPost;

}


char returnStrings(int indexPosition,char content[][MAX_CHARS], char * foundStrings[], char * phrase){
    int indexStr = 0, match=0, lengthOfPhrase = strlen(phrase);
    char string[25];
    int indexStrF=0,indexPostF=0;
    
       for(int i=0; i <= indexPosition; i++){
        if(strlen(content[i]) > 0){
            indexStr=0;
            memset(string, '\0', 25);

        for(int j=0; j < strlen(content[i]); j++){
            string[indexStr] = content[i][j];
            indexStr++;
            string[indexStr] = '\0';

            if(strlen(string) == strlen(phrase)  && strcmp(string,phrase)==0){ 
                foundStrings[indexPostF] = content[i];
                indexPostF++;
            }

            else if(content[i][j] == ' '){
                string[indexStr] = '\0';
                indexStr=0;
                memset(string, '\0', 25);
            }
        }
    }

    }

    for (int i = 0; i < indexPostF; i++)
    {   
        printf("\033[32m%s\033[0m\n",foundStrings[i]);
    }
    
    
    return 0;
}


char returnStringsViaSpecialChars(int indexPosition,char content[][MAX_CHARS], char * foundStrings[], char * phrase){

    int indexStr = 0, match=0, lengthOfPhrase = strlen(phrase);
    int indexPostF = 0;
    char string[25];
        for(int i=0; i <= indexPosition; i++){

        if(strlen(content[i]) > 0){
            indexStr=0;
            memset(string, '\0', 25);

            for(int j=0; j < strlen(content[i]); j++){

                string[indexStr] = content[i][j];
                indexStr++;
                string[indexStr] = '\0';
                
                if(strlen(string) == strlen(phrase) && strcmp(string,phrase)==0){
                        foundStrings[indexPostF] = content[i];
                        indexPostF++;
                }

                else{

                    indexStr=0;
                    memset(string, '\0', 25);
                }
                
            }
        }
    }

    for (int i = 0; i < indexPostF; i++)
    {
        printf("\033[34m%s\033[0m\n",foundStrings[i]);
    }

    return 0;
}
