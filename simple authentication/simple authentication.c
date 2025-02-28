#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>




#define LENGTH_OF_ARRAY(x)  (sizeof(x) / sizeof((x)[0]))


char ReadFromFile(char** readContents);

char ExtarctUsername(char * getContent,char ** extractU);

char ExtarctPasswords(char * getContent,char ** extractP);

int  VerfiyUsername(char * usernameExtaracted,char * expectedString, int *foundU);

int VerfiyPassword(char * passwordExtarcted, char * expectedString, int* foundP);



int main(){


    char * getContent = NULL;

    char* usernameExtaracted = NULL;

    char* passwordExtarcted = NULL;

    int foundU = 0, foundP = 0;

    char expectedString [20];

    char expectedString2 [20];

    

    printf("Welcome, Please enter username and password: \n");

    printf("Enter username: ");

    scanf("%s",expectedString);

    printf("Enter password: ");

    scanf("%s",expectedString2);


    ReadFromFile(&getContent);

    ExtarctUsername(getContent,&usernameExtaracted);

    ExtarctPasswords(getContent,&passwordExtarcted);
    
    int posU = VerfiyUsername(usernameExtaracted,expectedString,&foundU);
    
    int posP = VerfiyPassword(passwordExtarcted,expectedString2,&foundP);


    if(posU == posP && foundU != 0 && foundP != 0){
        printf("Welcome user!");
    }
    else{
        printf("Invalid username and password");
    }

    return 0;

}



char ReadFromFile(char ** readContents){

    FILE * file;

    size_t bytesRead;


    *readContents =  (char*)malloc(255 * sizeof(char));

    file = fopen("test.txt","r");

    if(file == NULL){

        perror("Can't open file, Check if file in the same directory/exsists");
    }


    bytesRead = fread(*readContents, 1, 254, file);

    (*readContents)[bytesRead] = '\0'; 
      
    fclose(file);

    return 0;
}







char ExtarctUsername(char* getContent, char** extractU){


    *extractU =  (char*)malloc(100 * sizeof(char));

    int indexExtract = 0;

    for(int i=0; i < strlen(getContent); i++){

        if(getContent[i] == 'e'){
            i++;

            if(getContent[i] == ':'){

                for(int j=i+1; j < strlen(getContent); j++){

                    if(getContent[j] == '\n'){
                          (*extractU)[indexExtract] = ',';
                          indexExtract++;
                          (*extractU)[indexExtract] = '\0';
                        break;
                    }

                    else{

                          (*extractU)[indexExtract] = getContent[j];
                          indexExtract++;
                          (*extractU)[indexExtract] = '\0';
                        
                    }
                }
                
            } 
        }

    }

    free(extractU);


    
    return 0;
}


char ExtarctPasswords(char* getContent, char** extractP){

    *extractP = (char*)malloc(100 * sizeof(char));

    int indexExtract = 0;

    for(int i=0; i < strlen(getContent); i++){

       if(getContent[i] == 'd'){
            i++;
            
            if(getContent[i] == ':'){

                for(int j=i+1; j < strlen(getContent); j++){

                    if(getContent[j] == '\n'){

                          (*extractP)[indexExtract] = ',';
                          indexExtract++;
                          (*extractP)[indexExtract] = '\0';
                        break;
                    }

                    else{
                          (*extractP)[indexExtract] = getContent[j];
                          indexExtract++;
                          (*extractP)[indexExtract] = '\0';
                    }
                }
                
            } 
        }
}

(*extractP)[indexExtract] = ',';
indexExtract++;
(*extractP)[indexExtract] = '\0';

free(extractP);

return 0;

}



int VerfiyUsername(char * usernameExtaracted, char * expectedString,int * foundU){

        char temp[50];

        int index = 0, posU = 0;


        for(int i=0; i < strlen(usernameExtaracted); i++){

        if(usernameExtaracted[i] == ','){

            if(strcmp(temp,expectedString) == 0){
                *foundU = 1;
                break;
            }
            else{
                memset(&temp[0], 0, sizeof(temp));
                index = 0;
                posU++;
            }
        }
        else{
            temp[index] = usernameExtaracted[i];
            index++;
            temp[index] = '\0';
        }
    }


    return posU;
}






int VerfiyPassword(char * passwordExtarcted, char * expectedString, int* foundP){

      char temp[50];

       int index = 0, posP = 0;


        for(int i=0; i < strlen(passwordExtarcted); i++){

            if(passwordExtarcted[i] == ','){
                if(strcmp(temp,expectedString) == 0){
                *foundP = 1;
                break;
            }
            else{
                memset(&temp[0], 0, sizeof(temp));
                index = 0;
                posP++;
            }
            }
            else{
                temp[index] = passwordExtarcted[i];
                index++;
                temp[index] = '\0';
            }

        }
    
    return posP;
}