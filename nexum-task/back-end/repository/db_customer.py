class customer_db():
     def __init__(self, connection):
        self.conn = connection
        self.cursor = self.conn.cursor(dictionary=True)

     def view_items(self):
         self.cursor.execute("""
                             SELECT product.id, product.name, product.description ,product.image_url, (coupon.minimum_sell_price) AS price
                             FROM product INNER JOIN coupon ON product.id=coupon.product_id
                             WHERE coupon.is_sold = 0
                             """)
         return self.cursor.fetchall()
     

     def view_item_by_id(self,product_id):
         query = ("""
                             SELECT product.id, product.name, product.description ,product.image_url, (coupon.minimum_sell_price) AS price, coupon.is_sold
                             FROM product INNER JOIN coupon ON product.id=coupon.product_id
                             WHERE product.id = %s
                             """)
         values = (str(product_id),)
         self.cursor.execute(query, values)
         return self.cursor.fetchone()
     
     def marked_item_as_sold(self,product_id):
        product = self.view_item_by_id(product_id)
        if product != None and len(product) != 0:
            if product['is_sold'] != 1:
                sold_item = "UPDATE coupon SET is_sold = 1 WHERE product_id = %s"
                sold_item_vals = (str(product_id),)
                self.cursor.execute(sold_item, sold_item_vals)
                self.conn.commit()
                return_coupon_value = "SELECT (value) AS coupon_value FROM coupon WHERE product_id = %s"
                coupon_value_vals = (str(product_id),)
                self.cursor.execute(return_coupon_value, coupon_value_vals)
                return self.cursor.fetchone(),None
            else:
                return None,409

        else:
            return None,404