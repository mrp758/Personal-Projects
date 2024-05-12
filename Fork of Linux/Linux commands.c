#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dirent.h>
#include <unistd.h>
#include <windows.h>
#include <errno.h>



void CreateNewFile();
void ShowDirectorys();
void ShowFiles();
void ReadFiles();
void CloseProgram();
void Echo();
void ReadUsersDataFile();
void CreateNewUser();
void DisplayCurrentDirectory();
void RemoveFile();
void ShowCurrentUser();
void CreateANewFolder();
void DeleteAFolder();
void EditFile();

struct structer
    {
        char Command[25];
        char WriteToFile[50];
        char CleanBuffer;
        char Directory[100];
        char UsersEcho[25];
        char NewUserName[10],NewPassWord[10];
        char FileName[25];
        char UserName[10];
        char PassWord[10];
        char ReadFromFile,Line[255];
    };

int main(){
    struct structer Object;
    printf("\nEnter your command: ");
    fgets(Object.Command,25,stdin);
    Object.Command[strcspn(Object.Command, "\n")] = '\0';
    while (1)
    {
    if(strcmp("touch", Object.Command)==0){
        CreateNewFile();
        main();
    }
    else if(strcmp("ls",Object.Command)==0){
        ShowFiles();
        main();
    }
    else if(strcmp("cd",Object.Command)==0){
        ShowDirectorys();
        main();
    }
    else if(strcmp("cat",Object.Command)==0){
        ReadFiles();
        main();
    }
    else if(strcmp("rmdir",Object.Command)==0){
            RemoveFile();
            main();
    }
    else if(strcmp("echo",Object.Command)==0){
        Echo();
        main();
    }
    else if(strcmp("clear",Object.Command)==0){
        system("cls");
        main();
    }
    else if(strcmp("pwd",Object.Command)==0){
        DisplayCurrentDirectory();
        main();
    }
    else if(strcmp("new",Object.Command)==0){
        CreateNewUser();
        main();
    }
    else if(strcmp("log",Object.Command)==0){
        ReadUsersDataFile();
        main();
    }
    else if(strcmp("whoami",Object.Command)==0){
        ShowCurrentUser();
        main();
    }
    else if(strcmp("mkdir",Object.Command)==0){
        CreateANewFolder();
        main();
    }
    else if(strcmp("rmdir directory",Object.Command)==0){
        DeleteAFolder();
        main();
    }
    else if(strcmp("edit",Object.Command)==0){
        EditFile();
        main();
    }
    else if(strcmp("exit",Object.Command)==0){
        CloseProgram();
        return 0;
    }
    else{
        printf("Command not found: %s\n",Object.Command);
        main();
    }
}
};






void CreateNewFile(){

struct structer Object;
FILE * fpointer;
printf("Enter the name of the file: ");
scanf("%[^\n]",Object.FileName);
scanf("%c",&Object.CleanBuffer);
if(access(Object.FileName,F_OK) == 0){
    printf("ERROR: File exists in the system!");
    fclose(fpointer);
}
else if(strcmp(Object.FileName,"")==0){
    printf("ERROR: FileName cannot be NULL/Empty string!");
    fclose(fpointer);
}
else{
    fpointer = fopen(Object.FileName,"w");
    // printf("Write Into file: ");
    // scanf("%[^\n]",Object.WriteToFile);
    // scanf("%c",&Object.CleanBuffer); // cleanBuffer statement to clear buffer (Spaces)
    fprintf(fpointer,"");
    fclose(fpointer);
}
};


void ShowFiles(){
    struct dirent *de;  
    DIR *dr = opendir(".");
    if (dr == NULL)  
    {
        printf("Failed: Could not open current directory\n");
    }
  else{
    while ((de = readdir(dr)) != NULL){
        printf("%s\n", de->d_name);
    }
    closedir(dr);    
  }
};



void ReadFiles(){
    struct structer Object;
    FILE * fpointer;
    printf("Enter the name of the file: ");
    scanf("%[^\n]",Object.FileName);
    scanf("%c",&Object.CleanBuffer);
    fpointer = fopen(Object.FileName,"r");
    if(fpointer != NULL){
    while((Object.ReadFromFile=fgetc(fpointer))!=EOF){
        printf("%c",Object.ReadFromFile);
    }
    fclose(fpointer);
    }
    else{
        printf("ERROR: %s Dosen't Exists!\n", Object.FileName);
    }


};





void ShowDirectorys(){
    struct structer Object;
    struct dirent *de;  

    printf("Enter Directory path: ");
    fgets(Object.Directory,100,stdin);
    Object.Directory[strcspn(Object.Directory, "\n")] = '\0';
    chdir(Object.Directory);
    DIR *dr = opendir(Object.Directory);
    closedir(dr);
};



void Echo(){
    struct structer Object;
    printf("Echo: ");
    fgets(Object.UsersEcho,25,stdin);
    printf("Echoed: %s",Object.UsersEcho);
};






void ReadUsersDataFile(){
    struct structer Object;
    FILE * fpointer;
    int i=0,j=0;
    printf("Enter the UserName: ");
    fgets(Object.UserName,10,stdin);
    Object.UserName[strcspn(Object.UserName, "\n")] = 0;
    printf("Enter the PassWord: ");
    fgets(Object.PassWord,10,stdin);
    Object.PassWord[strcspn(Object.PassWord, "\n")] = 0;
    fpointer = fopen("UsersData.txt","r");
    if(fpointer != NULL){
         while(fgets(Object.Line,sizeof(Object.Line),fpointer)){
            if(Object.UserName[j] == Object.Line[i] && strlen(Object.UserName) == 4 || Object.UserName[j] == Object.Line[i] && strlen(Object.UserName) == 3){
                while(fgets(Object.Line,sizeof(Object.Line),fpointer)){
                    if(Object.PassWord[j] == Object.Line[i] && strlen(Object.PassWord) == 4 || Object.PassWord[j] == Object.Line[i] && strlen(Object.PassWord) == 3){
                    fpointer = fopen("CurrentUser.txt","w");
                    printf("Success: Welcome\n");
                    fprintf(fpointer, "%s" , Object.UserName);
                    fclose(fpointer);
                    break;
                }
                    else{
                    printf("ERROR: UserName or PassWord are incorrect!");
                    fclose(fpointer);
                    break;
                }
            }
         }
      }
    }

    else{
       printf("UsersData isn't exist");
    }

};


void CreateNewUser(){
    struct structer Object;
    FILE * fpointer;
    int i=0,j=0;
    printf("Enter new UserName: ");
    fgets(Object.NewUserName,10,stdin);
    Object.NewUserName[strcspn(Object.NewUserName, "\n")] = 0;
    printf("Enter new PassWord: ");
    fgets(Object.NewPassWord,10,stdin);
    Object.NewPassWord[strcspn(Object.NewPassWord, "\n")] = 0;
    if(strcmp(Object.NewUserName, Object.NewPassWord)==0){
        printf("Failed: UserName and PassWord are the same!");
    }
    else if(strlen(Object.NewUserName) > 4 || strlen(Object.NewPassWord) > 4){
        printf("Failed: UserName or PassWord are over 4 characters!");
    }
     else if(fpointer != NULL){
        fpointer = fopen("UsersData.txt","r");
        while(fgets(Object.Line,sizeof(Object.Line),fpointer)){
        if(Object.NewUserName[i] == Object.Line[j] || Object.NewPassWord[i] == Object.Line[j]){
        printf("Failed: UserName or PassWord already exists!");
        break;
            }
        }
    }
    else{
    fpointer = fopen("UsersData.txt","a");
    fprintf(fpointer, "\n\n%s" , Object.NewUserName);
    fprintf(fpointer, "\n%s" , Object.NewPassWord);
    fclose(fpointer);
    printf("Success: UserName and PassWord is created");
    }
};



void DisplayCurrentDirectory(){
    struct structer Object;
    chdir(".");
    printf("%s\n", getcwd(Object.Directory, 100));
};


void RemoveFile(){
    struct structer Object;
    FILE * fpointer;
    strerror_s(Object.Line,255,errno);
    printf("Enter file name: ");
    fgets(Object.FileName,50,stdin);
    Object.FileName[strcspn(Object.FileName, "\n")] = 0;
    if((access(Object.FileName, F_OK) == 0)){
        remove(Object.FileName);
        printf("Success: %s has been deleted\n", Object.FileName);
        fclose(fpointer);
    }
    else {
        printf("ERROR: %s\n",Object.Line);
        fclose(fpointer);
        
    }
};


void ShowCurrentUser(){
    struct structer Object;
    FILE * fpointer;
    fpointer = fopen("CurrentUser.txt","r");
    if(fpointer != NULL){
    while((Object.ReadFromFile=fgetc(fpointer))!=EOF){
        printf("%c",Object.ReadFromFile);
    }
    fclose(fpointer);
    }
    else{
        printf("Current user: Signed in as guest");
    }
};


void CreateANewFolder(){
    struct structer Object;
    printf("Insert the name of the directory:\n");
    fgets(Object.Directory,20,stdin);
    Object.Directory[strcspn(Object.Directory, "\n")] = '\0';
    int CheckIfExists;
    CheckIfExists = mkdir(Object.Directory);
    if (!CheckIfExists)
        printf("Directory created\n");
    else {
        printf("ERROR: Unable to create directory,Exiting\n");
        exit(1);
    }
};


void DeleteAFolder(){
    struct structer Object;
    printf("Insert the name of the directory:\n");
    fgets(Object.Directory,20,stdin);
    Object.Directory[strcspn(Object.Directory, "\n")] = '\0';
    int CheckIfExists;
    CheckIfExists = rmdir(Object.Directory);
    if (!CheckIfExists)
        printf("Directory Deleted\n");
    else {
        printf("ERROR: Unable to Deleted directory,Exiting\n");
        exit(1);
    }
    
};




void EditFile(){
    struct structer Object;
    FILE * fpointer;
    printf("Enter the name of the file:\n");
    scanf("%[^\n]",Object.FileName);
    scanf("%c",&Object.CleanBuffer);
    if((access(Object.FileName, F_OK) == 1)){
         printf("ERROR: File dosen't exists's!");
         fclose(fpointer);
    }
    else {
        fpointer = fopen(Object.FileName,"a");
        printf("Write to the file: ");
        scanf("%[^\n]",Object.WriteToFile);
        scanf("%c",&Object.CleanBuffer); // cleanBuffer statement to clear buffer (Spaces)
        fprintf(fpointer, "%s " , Object.WriteToFile);
        fclose(fpointer);
    }
};

void CloseProgram(){
    remove("CurrentUser.txt");
    remove("UsersData.txt");
    printf("Exiting\n");
    exit(0);
};
