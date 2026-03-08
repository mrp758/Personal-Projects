class reseller_db():
     def __init__(self, connection):
        self.conn = connection
        self.cursor = self.conn.cursor(dictionary=True)

     def view_items(self):
         self.cursor.execute("""
                             SELECT product.id, product.name, product.description ,product.image_url, (coupon.cost_price) AS price
                             FROM product INNER JOIN coupon ON product.id=coupon.product_id
                             WHERE is_sold = 0
                             """)
         return self.cursor.fetchall()


     def view_item_by_id(self,product_id):
         query = ("""
                     SELECT product.id, product.name, product.description ,product.image_url, (coupon.minimum_sell_price) AS price
                     FROM product INNER JOIN coupon ON product.id=coupon.product_id
                     WHERE product.id = %s AND is_sold = 0
                     """)
         values = (str(product_id),)
         self.cursor.execute(query, values)
         result = self.cursor.fetchone()
         if result == None:
            return None,404
         else:
            return result,None
      

     def return_update_coupon_value(self, product_id):
         query = "SELECT product_id,value_type,(minimum_sell_price) AS reseller_price,value FROM coupon WHERE product_id = %s"
         values = (str(product_id),)
         self.cursor.execute(query, values)
         return self.cursor.fetchone()

     def mark_items_as_sold(self, product_id, reseller_price):
        query = "SELECT (minimum_sell_price) AS reseller_price FROM coupon WHERE product_id = %s AND is_sold != 1"
        values = (str(product_id),)
        self.cursor.execute(query, values)
        item = self.cursor.fetchone()

        if item != None and len(item) != 0:
         if reseller_price >= float(item['reseller_price']):
            mark_as_sold = "UPDATE coupon SET is_sold = 1 WHERE product_id = %s"
            mark_as_sold_vals = (str(product_id),)
            self.cursor.execute(mark_as_sold, mark_as_sold_vals)
            self.conn.commit()
            return self.return_update_coupon_value(product_id),None,None
         
         else:
            return None,400,float(item['reseller_price'])
         
        else:
            return None,404,None
