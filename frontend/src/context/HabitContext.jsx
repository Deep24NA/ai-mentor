import { useContext, createContext, useState, useEffect } from "react";

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
    const today = new Date().toDateString();
    const [habits, setHabits] = useState(() => {
        try {
            const saved = localStorage.getItem("habits");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });


    const [lastHabitDate, setLastHabitDate] = useState(() => {
        return localStorage.getItem("lastHabitDate")
    })

    useEffect(() => {
        if (lastHabitDate !== today) {
            setHabits((prev) =>
                prev.map((habit) => ({
                    ...habit,
                    completedToday: false,
                }))
            );
            setLastHabitDate(today)
        }
    }, [lastHabitDate, today])


    useEffect(() => {
        localStorage.setItem("habits", JSON.stringify(habits))
        localStorage.setItem("lastHabitDate", lastHabitDate)
    }, [habits, lastHabitDate]);

    const addHabit = (title) => {
        if (!title.trim()) return;

        setHabits((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                title,
                completedToday: false,
            },
        ]);
    };


    const toggleHabit = (id) => {
        setHabits((prev) =>
            prev.map((habit) =>
                habit.id === id
                    ? { ...habit, completedToday: !habit.completedToday } :
                    habit))
    };

    const completedTodayCount = habits.filter((habit) => habit.completedToday).length;

    return (
        <HabitContext.Provider value={{
            habits,
            addHabit,
            toggleHabit,
            completedTodayCount
        }}>
            {children}
        </HabitContext.Provider>
    )

}


export const useHabits = () => useContext(HabitContext)