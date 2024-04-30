import "./DigitalClock.css"
import { useEffect, useState } from "react";



export const DigitalClock = () => {
    
    const [clockState, setclockState] = useState();

    useEffect(() => {
        setInterval(() => {
        const date = new Date();
        setclockState(date.toLocaleTimeString());
        }, 1000);
    }, []);

    return (
        <div className='digital-clock'>
            <h1>Reloj</h1>
            <h2>{clockState}</h2>
        </div>
    )
}
