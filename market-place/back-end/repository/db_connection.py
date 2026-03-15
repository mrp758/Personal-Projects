import mysql.connector


def create_connection(host, user, password,database):
    connection_string = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database,
        port=3306
)
    return connection_string
