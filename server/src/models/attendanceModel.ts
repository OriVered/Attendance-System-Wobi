export interface AttendanceRecord {
    id: string;
    userId: number;
    userName: string;
    checkIn?: string;
    checkOut?: string;
    date: string;
}
