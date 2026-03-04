export interface WebsocketState {
    isConnected: boolean;
    subscribedTopics: Record<string, boolean>;
}