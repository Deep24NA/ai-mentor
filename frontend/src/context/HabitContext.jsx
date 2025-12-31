import { useContext, createContext, useState, useEffect } from "react";
import {
    fetchHabits,
    createHabit,
    toggleHabit as toggleHabitApi
} from "../services/habit.api"

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
    const today = new Date().toDateString();
    const [habits, setHabits] = useState([]);
    const [lastHabitDate, setLastHabitDate] = useState(() => {
        return localStorage.getItem("lastHabitDate")
    });

    useEffect(() => {
        fetchHabits()
            .then(setHabits)
            .catch(console.error);
    }, [])

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
        localStorage.setItem("lastHabitDate", lastHabitDate)
    }, [lastHabitDate])


    const addHabit = async (title) => {
        if (!title.trim()) return;
        const newHabit = await createHabit(title);
        setHabits((prev) => [...prev, newHabit]);
    };


    const toggleHabit = async (id) => {
        const updatedHabit = await toggleHabitApi(id);
        setHabits((prev) =>
            prev.map((habit) =>
                habit._id === id ? updatedHabit : habit
            )
        );
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