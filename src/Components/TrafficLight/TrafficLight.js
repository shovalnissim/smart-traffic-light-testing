import React from 'react';
import './TrafficLight.css';
import { GREEN_LIGHT } from '../../Services/config';

const TrafficLight = ({ light, direction }) => {
    const message = light === GREEN_LIGHT ? 'Go' : 'Stop';

    return (
        <div className={`traffic-light ${light} ${direction}`}>
            <div className={`light-circle ${light}`}>
                {message}
            </div>
        </div>
    );
};

export default TrafficLight;