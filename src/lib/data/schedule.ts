import { shows } from './shows';

export interface ScheduleSlot {
    showId: string;
    showTitle: string;
    host: string;
    time: string;
    genre: string;
}

export interface DaySchedule {
    day: string;
    slots: ScheduleSlot[];
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function generateSchedule(): DaySchedule[] {
    const schedule: DaySchedule[] = days.map(day => ({ day, slots: [] }));

    shows.forEach(show => {
        show.schedule.forEach(slot => {
            const daySchedule = schedule.find(d => d.day === slot.day);
            if (daySchedule) {
                daySchedule.slots.push({
                    showId: show.id,
                    showTitle: show.title,
                    host: show.host,
                    time: slot.time,
                    genre: show.genre
                });
            }
        });
    });

    // Sort slots by time
    schedule.forEach(day => {
        day.slots.sort((a, b) => {
            const timeA = parseInt(a.time.split(':')[0]);
            const timeB = parseInt(b.time.split(':')[0]);
            return timeA - timeB;
        });
    });

    return schedule;
}

export const weeklySchedule = generateSchedule();

export function getScheduleForDay(day: string): ScheduleSlot[] {
    const daySchedule = weeklySchedule.find(d => d.day === day);
    return daySchedule?.slots || [];
}

export function getCurrentShow(): ScheduleSlot | null {
    const now = new Date();
    const currentDay = days[now.getDay() === 0 ? 6 : now.getDay() - 1]; // Adjust for Monday start
    const currentHour = now.getHours();

    const todaySchedule = getScheduleForDay(currentDay);

    for (const slot of todaySchedule) {
        const [startTime, endTime] = slot.time.split(' - ');
        const startHour = parseInt(startTime.split(':')[0]);
        const endHour = parseInt(endTime.split(':')[0]);

        if (currentHour >= startHour && currentHour < endHour) {
            return slot;
        }
    }

    return null;
}
