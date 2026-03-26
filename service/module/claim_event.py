from service.helper.load_query import load_query
from service.helper.get_connection import get_connection
import psycopg2
import psycopg2.extras

def claim_event(user_id, event_id):
    """
    Attempts to claim an event for a specific user.
    Returns the event details if successful, or None if the event 
    was already claimed or the ID is invalid.
    """
    query = load_query("update","claim_event.sql")
    conn = None
    try:
        conn = get_connection()
        # Using DictCursor allows accessing columns by name
        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        # Execute the query
        cur.execute(query, (user_id, event_id))
        result = cur.fetchone()
        print("result",result)

        conn.commit()

        if result:
            print(f"Event {event_id} claimed by {user_id}")
            return dict(result)
        else:
            print(
                f"Could not claim event {event_id}. It may be already claimed or missing.")
            return None

    except Exception as e:
        print(f"Database Error during claim: {e}")
        if conn:
            conn.rollback()
        return None
    finally:
        if conn:
            cur.close()
            conn.close()
