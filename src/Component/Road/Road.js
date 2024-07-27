import React, { useEffect, useState } from 'react';
import TrafficLight from '../TrafficLight/TrafficLight';
import './Road.css';

const Road = ({ cars, direction, light, trafficService, isCarCrossing }) => {

    const [carDriving, setCarDriving] = useState(false);

    useEffect(() => {

        if (light === 'green' && cars > 0 && !isCarCrossing) {
            setCarDriving(true);
            trafficService.setCarCrossingState(true);
            trafficService.removeCar(direction);

            setTimeout(() => {
                setCarDriving(false);
                trafficService.setCarCrossingState(false);
            }, 2000);
        };

    }, [light, cars, direction, trafficService, isCarCrossing]);

    return (
        <div className={`road ${direction}`}>
            <TrafficLight light={light} direction={direction} />
            <div className={`cars ${direction}`}>
                {carDriving && <div className={`car-driving ${direction}`}>🚗</div>}
                {Array.from({ length: cars }, (_, index) => (
                    <div className="car" key={index}>
                        🚗
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Road;
