"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const loadMessages = async () => {
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setMessages(data);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const deleteMessage = async (id: number) => {
    if (!confirm("Delete this message?")) return;

    await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    loadMessages();
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Inbox</h1>

      {messages.length === 0 && (
        <p className="text-slate-500">No messages.</p>
      )}

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">
                  {msg.name}
                </h3>
                <p className="text-sm text-slate-500">
                  {msg.email}
                </p>
              </div>

              <button
                onClick={() => deleteMessage(msg.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>

            <p className="mt-3 text-slate-700">
              {msg.message}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              {new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
