class admin_access_db():
     def __init__(self, connection):
        self.conn = connection
        self.cursor = self.conn.cursor(dictionary=True)

     def create_items(self,name, description, product_type, image_url):
         query = """
         INSERT INTO product (id, name, description, type, image_url)
         VALUES (UUID(), %s, %s, %s, %s)
         """
         values = (str(name), str(description), str(product_type), str(image_url))
         self.cursor.execute(query, values)
         self.conn.commit()

     def create_and_show_item(self,name, description, product_type, image_url):
            self.create_items(name,description,product_type,image_url)
            query = """
                                    SELECT id, name, description ,image_url
                                    FROM product
                                    WHERE name = %s
                                    """
            values = (str(name),)
            self.cursor.execute(query,values)
            return self.cursor.fetchone()

     def view_items(self):
         self.cursor.execute("""
                             SELECT * FROM product
                             """)
         return self.cursor.fetchall()
         


     def update_item(self,table_name, column_name, product_id, current_column_value, new_column_value):
        query = f"UPDATE {table_name} SET {column_name} = %s WHERE {column_name} = %s AND id = %s"
        values = (new_column_value,current_column_value,str(product_id))
        self.cursor.execute(query, values)
        self.conn.commit()


     def delete_item(self, product_id):
         query = f"DELETE FROM product WHERE id = %s"
         values = (str(product_id),)
         self.cursor.execute(query, values)
         self.conn.commit()


