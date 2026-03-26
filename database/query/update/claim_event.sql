UPDATE events
SET 
    claimed_by = %s, 
    status = 'claimed',
    claimed_at = NOW()
WHERE id = %s 
  AND status = 'available'
RETURNING id, content, region;

