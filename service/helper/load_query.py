import os


def load_query(dir,filename):
    """Reads a SQL query from the database/queries folder."""
    # print(BASE_DIR)
    # print(os.getcwd(), os.listdir(os.getcwd()))
    path = os.path.join(os.getcwd(), "database", "query", dir, filename)
    # print(path)
    try:
        with open(path, 'r') as f:
            return f.read()
    except ():
        print("File Not Found", os.getcwd())
