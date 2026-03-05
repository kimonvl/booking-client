import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Send,
  Search,
  ChevronDown,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

type Chat = {
  id: string;
  guestName: string;
  propertyName: string;
  propertyId: string;
  lastMessage: string;
  lastTime: string;
  unreadCount?: number;
};

type Message = {
  id: string;
  from: "guest" | "host";
  text: string;
  time: string;
};

const MOCK_CHATS: Chat[] = [
  {
    id: "c1",
    guestName: "Maria P.",
    propertyName: "Kimon House",
    propertyId: "15662273",
    lastMessage: "Hi! Is late check-in possible?",
    lastTime: "09:14",
    unreadCount: 2,
  },
  {
    id: "c2",
    guestName: "John S.",
    propertyName: "Kimon House",
    propertyId: "15662273",
    lastMessage: "Thanks, we’ll arrive around 18:00.",
    lastTime: "Yesterday",
  },
  {
    id: "c3",
    guestName: "Eleni K.",
    propertyName: "Petra View",
    propertyId: "15512249",
    lastMessage: "Can we store luggage after checkout?",
    lastTime: "Mon",
    unreadCount: 1,
  },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  c1: [
    { id: "m1", from: "guest", text: "Hi! Is late check-in possible?", time: "09:01" },
    { id: "m2", from: "host", text: "Yes — we can arrange late check-in. What time do you expect to arrive?", time: "09:05" },
    { id: "m3", from: "guest", text: "Maybe around 23:30, flight is a bit late.", time: "09:14" },
  ],
  c2: [
    { id: "m1", from: "guest", text: "Hello! Just confirming parking is available.", time: "12:10" },
    { id: "m2", from: "host", text: "Yes, parking is available nearby. I’ll send details.", time: "12:12" },
    { id: "m3", from: "guest", text: "Thanks, we’ll arrive around 18:00.", time: "12:15" },
  ],
  c3: [
    { id: "m1", from: "guest", text: "Can we store luggage after checkout?", time: "10:22" },
    { id: "m2", from: "host", text: "Of course — we can store it until 18:00.", time: "10:24" },
  ],
};

export default function InboxTab() {
  const [topTab, setTopTab] = React.useState<"guest" | "cs">("guest");
  const [activeChatId, setActiveChatId] = React.useState<string>(MOCK_CHATS[0]?.id ?? "");
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState<"unanswered" | "all">("unanswered");

  const [draft, setDraft] = React.useState("");
  const [messages, setMessages] = React.useState<Record<string, Message[]>>(MOCK_MESSAGES);

  const activeChat = React.useMemo(
    () => MOCK_CHATS.find((c) => c.id === activeChatId) ?? null,
    [activeChatId]
  );

  const filteredChats = React.useMemo(() => {
    const q = search.trim().toLowerCase();

    let list = MOCK_CHATS.filter((c) => {
      if (!q) return true;
      return (
        c.guestName.toLowerCase().includes(q) ||
        c.propertyName.toLowerCase().includes(q) ||
        c.propertyId.toLowerCase().includes(q)
      );
    });

    if (sort === "unanswered") {
      // demo behavior: treat "unreadCount > 0" as unanswered
      list = list.filter((c) => (c.unreadCount ?? 0) > 0);
    }

    return list;
  }, [search, sort]);

  const activeMessages = messages[activeChatId] ?? [];

  const onSend = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newMsg: Message = {
      id: `${activeChatId}-${Date.now()}`,
      from: "host",
      text,
      time,
    };

    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] ?? []), newMsg],
    }));
    setDraft("");
  };

  return (
    <div className="w-full">
      {/* Top mini-tabs (Guest / Customer Service) */}
      <div className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6">
          <Tabs value={topTab} onValueChange={(v) => setTopTab(v as "guest" | "cs")}>
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0 gap-10 border-b">
              <TabsTrigger
                value="guest"
                className="rounded-none px-0 py-4 data-[state=active]:border-b-2 data-[state=active]:border-[#0071c2]"
              >
                Guest
              </TabsTrigger>
              <TabsTrigger
                value="cs"
                className="rounded-none px-0 py-4 data-[state=active]:border-b-2 data-[state=active]:border-[#0071c2]"
              >
                Customer Service
              </TabsTrigger>
            </TabsList>

            <TabsContent value="guest" className="m-0">
              {/* 3-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr_320px] min-h-[calc(100vh-220px)]">
                {/* LEFT: Chat list + filters */}
                <div className="border-r bg-white">
                  <div className="p-4">
                    <div className="text-sm font-semibold text-[#1a1a1a]">Messages</div>

                    {/* Chat list */}
                    <div className="mt-3 space-y-2">
                      {filteredChats.length === 0 ? (
                        <div className="text-sm text-muted-foreground p-3 border rounded">
                          No chats match your filters.
                        </div>
                      ) : (
                        filteredChats.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setActiveChatId(c.id)}
                            className={cn(
                              "w-full text-left rounded border p-3 hover:bg-muted/30 transition",
                              c.id === activeChatId ? "border-[#0071c2] bg-[#0071c2]/5" : "border-border"
                            )}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-sm font-semibold text-[#1a1a1a]">
                                  {c.guestName}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {c.propertyName} · {c.propertyId}
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-2">
                                <div className="text-xs text-muted-foreground">{c.lastTime}</div>
                                {(c.unreadCount ?? 0) > 0 && (
                                  <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white">
                                    {c.unreadCount}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="mt-2 text-xs text-muted-foreground line-clamp-1">
                              {c.lastMessage}
                            </div>
                          </button>
                        ))
                      )}
                    </div>

                    {/* Filters */}
                    <div className="mt-6 space-y-4">
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-2">
                          Search by name or booking number
                        </div>
                        <div className="relative">
                          <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pr-9"
                            placeholder="Search…"
                          />
                          <Search className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-2">
                          Sort messages by:
                        </div>
                        <button
                          type="button"
                          onClick={() => setSort((s) => (s === "unanswered" ? "all" : "unanswered"))}
                          className="w-full flex items-center justify-between rounded border px-3 py-2 text-sm hover:bg-muted/30"
                        >
                          <span>{sort === "unanswered" ? "Unanswered messages" : "All messages"}</span>
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <div className="mt-1 text-[11px] text-muted-foreground">
                          (Demo) Click to toggle unanswered/all.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MIDDLE: Conversation */}
                <div className="bg-white flex flex-col">
                  {/* conversation header */}
                  <div className="border-b p-4">
                    {activeChat ? (
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold text-[#1a1a1a]">
                            {activeChat.guestName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {activeChat.propertyName} · {activeChat.propertyId}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Conversation open
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Select a conversation</div>
                    )}
                  </div>

                  {/* messages */}
                  <div className="flex-1 overflow-y-auto p-6 bg-muted/10">
                    {activeChat ? (
                      <div className="space-y-3">
                        {activeMessages.map((m) => (
                          <div
                            key={m.id}
                            className={cn(
                              "flex",
                              m.from === "host" ? "justify-end" : "justify-start"
                            )}
                          >
                            <div
                              className={cn(
                                "max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                                m.from === "host"
                                  ? "bg-[#0071c2] text-white rounded-br-md"
                                  : "bg-white border text-[#1a1a1a] rounded-bl-md"
                              )}
                            >
                              <div className="whitespace-pre-wrap">{m.text}</div>
                              <div
                                className={cn(
                                  "mt-1 text-[11px]",
                                  m.from === "host" ? "text-white/80" : "text-muted-foreground"
                                )}
                              >
                                {m.time}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                        Pick a chat to start.
                      </div>
                    )}
                  </div>

                  {/* composer */}
                  <div className="border-t p-4 bg-white">
                    <div className="flex items-center gap-3">
                      <Input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Write a message…"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") onSend();
                        }}
                      />
                      <Button
                        className="bg-[#0071c2] hover:bg-[#005fa3]"
                        onClick={onSend}
                        disabled={!activeChat || draft.trim().length === 0}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 text-[11px] text-muted-foreground">
                      Press Enter to send.
                    </div>
                  </div>
                </div>

                {/* RIGHT: info panel */}
                <div className="border-l bg-white">
                  <div className="p-4 text-sm text-muted-foreground">
                    Booking.com receives all messages written here and processes them according to our{" "}
                    <span className="text-[#0071c2] underline cursor-pointer">
                      Privacy &amp; Cookie Statement
                    </span>
                    .
                  </div>

                  <div className="px-4">
                    <Card className="rounded-none">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#1a1a1a]">
                          <MessageSquare className="h-4 w-4" />
                          Tips
                        </div>
                        <ul className="mt-3 list-disc pl-4 text-xs text-muted-foreground space-y-2">
                          <li>Reply quickly to improve guest satisfaction.</li>
                          <li>Confirm arrival times and special requests.</li>
                          <li>Keep messages short and friendly.</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cs" className="m-0">
              <div className="p-6 text-sm text-muted-foreground">
                Customer Service inbox (mock). You can build a similar layout here.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}