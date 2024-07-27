import React from 'react';
import './TrafficLight.css';

const TrafficLight = ({ light, direction }) => {
    const message = light==='green' ? 'Go' : 'Stop';

    return (
        <div className={`traffic-light ${light} ${direction}`}>
            <div className={`light-circle ${light}`}>
                {message}
            </div>
        </div>
    );
};

export default TrafficLight;