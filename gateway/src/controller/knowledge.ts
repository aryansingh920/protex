import { Request, Response } from "express";
import { producer } from "../helper/kafka_producer";

interface request {
  eventId: string;
  userId: string;
}

export const sendKnowledgeCommand = async (eventId: string, userId: string) => {
  await producer.send({
    topic: "event-commands",
    messages: [
      {
        key: eventId, // Use eventId as key to ensure same-event orders go to same partition
        value: JSON.stringify({
          type: "ACKNOWLEDGE_EVENT",
          payload: { eventId, userId, timestamp: new Date().toISOString() },
        }),
      },
    ],
  });
};

export const getKnowledge = async (req: Request, res: Response) => {
  try {
    const { eventId, userId }: request = req.body;

    if (!eventId || !userId) {
      res.status(400).json({ error: "Missing eventId or userId" });
      return;
    }

    await sendKnowledgeCommand(eventId, userId);

    res.status(200).json({
      message: "Claim request received and is being processed",
      eventId,
    });
  } catch (error) {
    console.error("Error publishing to Kafka:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
