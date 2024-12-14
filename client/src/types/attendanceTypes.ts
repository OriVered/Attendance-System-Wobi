export interface AttendanceData {
    checkIn?: string;
    checkOut?: string;
    userName?: string | null;
  }
  
  export interface AttendanceRecord {
    userName: string;
    checkIn: string;
    checkOut: string;
  }
  