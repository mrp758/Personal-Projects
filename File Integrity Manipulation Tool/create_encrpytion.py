import hashlib
import base64
import json
import os

class Create_Encrpytion():

    def __init__(self,folder_path,simulation_output_path):

        self.folder_path = folder_path

        self.simulation_output_path = simulation_output_path

        self.folder_files_list = os.listdir(folder_path)

        self.file_contents_in_bytes = {}

        self.file_contents_copy = {}

        self.hashed_content = ""

        self.encoded_content = ""
    

    def read_file_contents(self):
            
            try:

                for filename in self.folder_files_list:

                    with open(os.path.join(self.folder_path,filename),mode="rb") as file:
                        
                        self.file_contents_in_bytes[filename] = file.read()
            
            except Exception as reading_file_contents_error:

                 return f"Exception occured while reading file in function read_file_contents details as following: {reading_file_contents_error}"
    


    def simulate_exfiltration(self):

        try:
            for filename in self.folder_files_list:

                with open(os.path.join(self.folder_path,filename),mode="r") as file:
                    
                    self.file_contents_copy[filename] = file.read()

        except Exception as reading_file_contents_error:

                return f"Exception occured while reading file in function simulate_exfiltration details as following:  {reading_file_contents_error}"

        try:

            for filename,contents in self.file_contents_copy.items():

                    with open(os.path.join(self.simulation_output_path,filename),mode="w") as file:

                        file.write(contents)

        except Exception as writing_contents_file_error:

                return f"Exception occured while writing to file in function simulate_exfiltration details as following:  {writing_contents_file_error}"
        



    def create_encrpytion_base64_and_hash(self):

        try:

            for filename,contents in self.file_contents_in_bytes.items():

                with open(os.path.join(self.folder_path,filename),mode="wb") as file:

                    get_content = contents

                    encoded_hash = hashlib.sha256(get_content).hexdigest()

                    encoded_base64 = base64.b64encode(get_content)

                    self.hashed_content = encoded_hash

                    self.encoded_content = encoded_base64

                    json_format = json.dumps({"hashed_content" : encoded_hash, "base64_content" : str(encoded_base64)},indent=2)

                    file.write(bytes(json_format,encoding="utf-8"))

        except Exception as encrpytion_creation_error:

            return f"Exception occured while creating encrpytion to file in function create_encrpytion_base64_and_hash details as following:  {encrpytion_creation_error}"
        


start = Create_Encryption(os.path.join(os.getcwd(),"enter_target_path"),os.path.join(os.getcwd(),"enter_simulate_exfiltration_path"))

start.read_file_contents()

start.simulate_exfiltration()

start.create_encrpytion_base64_and_hash()
