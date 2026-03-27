UPDATE events
SET 
    status = 'claimed',
    claimed_by = %s,
    claimed_at = NOW()
WHERE 
    id = %s 
    AND (status = 'available' OR claimed_at < NOW() - INTERVAL '15 minutes')
RETURNING *;
