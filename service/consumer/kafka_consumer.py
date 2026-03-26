import os
import json
from dotenv import load_dotenv
from confluent_kafka import Consumer, KafkaException, KafkaError

# Load environment variables from .env file
load_dotenv()


def create_consumer():
    # --- Configuration ---
    # Note: KAFKA_GROUP_ID is required for consumers to track offsets
    conf = {
        'bootstrap.servers': os.getenv('KAFKA_BROKERS', 'localhost:9092'),
        'group.id': f"{os.getenv('KAFKA_CLIENT_ID')}-group",
        'auto.offset.reset': 'earliest',  # Start from beginning if no offset exists
        'client.id': os.getenv('KAFKA_CLIENT_ID')
    }

    topic = os.getenv('KAFKA_TOPIC_NAME', 'event-commands')


    consumer = Consumer(conf)

    try:
        consumer.subscribe([topic])
        print(f"Subscribed to topic: {topic}")
        print("Waiting for messages... (Ctrl+C to exit)")

        while True:
            msg = consumer.poll(timeout=1.0)
            if msg is None:
                continue

            if msg.error():
                if msg.error().code() in (KafkaError._PARTITION_EOF,
                                        KafkaError.UNKNOWN_TOPIC_OR_PART):
                    continue
                else:
                    raise KafkaException(msg.error())


            # Process the message
            try:
                # Decode and parse JSON
                payload = json.loads(msg.value().decode('utf-8'))

                # Logic: Check if the message matches your producer type
                # (Assuming the type is sent within the message body)

                print(f"Received {payload["type"]}:")
                print(json.dumps(payload, indent=2))


            except json.JSONDecodeError:
                print(
                    f"Received non-JSON message: {msg.value().decode('utf-8')}")

    except KeyboardInterrupt:
        print("\nClosing consumer...")
    finally:
        consumer.close()


if __name__ == "__main__":
    create_consumer()
