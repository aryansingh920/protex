INSERT INTO users (username, prefix, first_name, last_name, region) 
VALUES %s 
ON CONFLICT DO NOTHING;
