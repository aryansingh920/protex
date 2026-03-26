INSERT INTO users (username, region) 
VALUES (%s, %s) 
RETURNING id;
