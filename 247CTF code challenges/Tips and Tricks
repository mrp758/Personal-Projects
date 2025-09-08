import socket



host = "socket hostname"
port = "port number"



with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((host, port))

    while True:
        data = s.recv(4096)
        if not data:
            break

        decoded = data.decode()
        print("Received:", decoded)

        
        num = ""
        num2 = ""
        symbol = ""
        after_symbol = False
        question = None

        lines = decoded.splitlines()
        for line in lines:
            if "What is the answer to" in line:
                question = line
                break

        if question is None:
            print("Final message or flag:", decoded)
            break

        
        for char in question:
            if char in '+-*/':
                symbol = char
                after_symbol = True
            elif char.isdigit():
                if not after_symbol:
                    num += char
                else:
                    num2 += char

       
        num = int(num)
        num2 = int(num2)
        if symbol == '+':
            result = num + num2

        print(f"Sending: {result}")
        s.sendall((str(result) + '\r\n').encode())
