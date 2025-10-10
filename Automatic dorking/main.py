from automatic_dork import generate_dorks,dork



def greet_user():

 
    print("Options\n")
    print("-d domain name\n")
    print("-c category 1. only domain name 2. domain name on github (any traces)\n")
    print("-l:  Filename with list of dorks (defaults to ListOfDorks.csv in current folder)\n")
    print("-e: Select search engine for dorking (Default is google engine)\n")
    print("-f: File output (Optional)\n")
    print("Example usage: -d example.com -e duckduckgo -l myfile.txt\n")
    user_input = input("Enter here: ")
    extract = user_input.lower().split()
    sorted_values = {}

    for index,char in enumerate(extract):
        if char == '-d':
            sorted_values['domain'] = extract[index+1]
        elif char == '-c':
            sorted_values['category'] = extract[index+1].lower()
        elif char == '-e':
            sorted_values['search_engine'] = extract[index+1].lower()
        elif char == '-l':
            sorted_values['custom_file_dork']  = extract[index+1]
        elif char == '-f':
           sorted_values['output_file'] = extract[index+1]
    return sorted_values


