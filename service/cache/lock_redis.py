import redis
import os
from service.module.claim_event import claim_event

# Connect to Redis (assuming 'redis' is the service name in docker-compose)
r = redis.Redis(host=os.getenv('REDIS_HOST', 'redis'),
                port=6379, decode_responses=True)


def process_claim(moderator_id, event_id):
    lock_key = f"lock:event:{event_id}"

    # 1. Attempt to acquire the lock in Redis
    # nx=True makes this atomic: it returns True only if the key didn't exist
    is_locked = r.set(lock_key, moderator_id, ex=900, nx=True)

    if not is_locked:
        print(
            f"Event {event_id} is already being processed by someone else.")
        return None

    # 2. If we got the lock, proceed to update Postgres
    event_data = claim_event(moderator_id, event_id)

    if not event_data:
        # If Postgres update failed (e.g. already claimed in DB but not Redis)
        # Clean up the Redis lock immediately
        r.delete(lock_key)
        return None

    return event_data
