import { AttendanceRecord } from "../models/attendanceModel";
import { loadData, saveData } from "../utils/fileManager";

export const addAttendance = (record: AttendanceRecord): void => {
    const data = loadData();

    const existingRecordIndex = data.attendance.findIndex(
        (r: AttendanceRecord) => r.userId === record.userId && r.date === record.date
    );

    if (existingRecordIndex === -1) {
        // If the record does not exist, create a new one
        const newId = data.attendance.length > 0 ? parseInt(data.attendance[data.attendance.length - 1].id) + 1 : 1;
        data.attendance.push({ ...record, id: newId.toString() });
        saveData(data);
    } else {
        // If the record exists, update the checkIn or checkOut fields
        const existingRecord = data.attendance[existingRecordIndex];

        if (record.checkIn && !existingRecord.checkIn) {
            existingRecord.checkIn = record.checkIn;
        }
        if (record.checkOut && !existingRecord.checkOut) {
            existingRecord.checkOut = record.checkOut;
        }

        saveData(data);
    }
};

export const getAttendanceRecords = (): AttendanceRecord[] => {
    const data = loadData();
    return data.attendance;
};

export const getAttendanceByUserId = async (userId: number, date?: string): Promise<AttendanceRecord | null> => {
    const records = getAttendanceRecords(); // Fetch all records
    return records.find(record => record.userId === userId && (!date || record.date === date)) || null;
};
