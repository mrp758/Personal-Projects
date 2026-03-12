from jose import jwt
from datetime import datetime,timezone, timedelta
import json
import uuid
from datetime import datetime, timezone
import os

class authenticate_user():
    def __init__(self,connection):
        self.SECRET_KEY = "015018129d5618cdf69ed789c9afeb24d5a3ef07fc30915ade8dedcc4cf763d3"
        self.ALGORITHM = "HS256"
        self.conn = connection
        self.cursor = self.conn.cursor(dictionary=True)

    def handle_login(self,user_name,password):
        query = "SELECT username,role FROM users WHERE username=%s AND password=%s"
        values = (user_name,password)
        self.cursor.execute(query, values)
        result = self.cursor.fetchone()
        if result == None:
            return None,401
        else:
            return result,None
        
    def create_json_jwt_file(self):
        if os.path.exists("jwt_keys_file.json") != True:
            with open("jwt_keys_file.json","w") as file:
                file.write("[]")

    def read_jwts_file(self):
        with open("jwt_keys_file.json","r") as file:
            data = json.load(file)
            return data
    
    def write_to_jwts_file(self,object_to_json):
        data = self.read_jwts_file()
        data.append(object_to_json)
        with open("jwt_keys_file.json","w") as file:
            json.dump(data,file,ensure_ascii=False, indent=4)

    def update_jwt_file(self, data):
        with open("jwt_keys_file.json", "w") as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
    
    def cleanup_expired_sessions(self):
        data = self.read_jwts_file()
        now = datetime.now(timezone.utc).timestamp()
        filtered_data = []
        for item in data:
            exp = item.get("exp")
            if exp > now:
                filtered_data.append(item)
        self.update_jwt_file(filtered_data)

    
    def create_access_token(self,user_object):
        self.create_json_jwt_file()
        data = self.read_jwts_file()
        session_already_exists = False
        for item in data:
            if user_object.get("sub") == item.get("username"):
                session_already_exists = True
        if session_already_exists != False:
            return None,403
        else:
            copy_user_object = user_object.copy()
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
            token_id = str(uuid.uuid4())
            copy_user_object.update({"exp": expire,"jti": token_id})
            encoded_jwt = jwt.encode(copy_user_object, self.SECRET_KEY, algorithm=self.ALGORITHM)
            object_to_json = {"jti": token_id,"username": copy_user_object['sub'],"exp": copy_user_object['exp']}
            self.write_to_jwts_file(object_to_json)
            return encoded_jwt,None
    
    def find_user_in_json_and_return_creds(self,jti_from_token):
        json_object = self.read_jwts_file()
        for item in json_object:
            if item.get("jti") == jti_from_token:
                return item.get("jti")
        return None
    
    def verify_token(self,user_token):
        payload = jwt.decode(user_token, self.SECRET_KEY, algorithms=[self.ALGORITHM])
        jti_from_token = payload.get("jti")
        expire_from_token = payload.get("exp")
        found_jti_token  = self.find_user_in_json_and_return_creds(jti_from_token)
        if found_jti_token == None:
            return 401
        if (datetime.now(timezone.utc).timestamp() > expire_from_token):
            self.cleanup_expired_sessions()
            return 401
