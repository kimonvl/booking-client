import type { AddressType } from "@/types/request/apartment/addApartmentRequest.types";

export interface PropertyOperationsRow {
    id: number;
    name: string;
    address: AddressType;
    status: string;
    arrivalsNext48: number;
    departuresNext48: number;
    guestMessages: number;
    bookingMessages: number;
}

export interface SummaryTile {
    label: string;
    value: number;
};

export interface GroupHomeState {
    operationsTable: PropertyOperationsRow[];
    summaryTiles: SummaryTile[];
    operationsLoading: boolean;
    summaryTilesLoading: boolean;
    error: string | null;
}