import React from 'react';
import { useObservable } from 'react-use';
import Road from '../Road/Road';
import './Intersection.css';

function Intersection({ trafficService }) {
    const nsQueue = useObservable(trafficService.nsQueue, 0);
    const ewQueue = useObservable(trafficService.ewQueue, 0);
    const nsLight = useObservable(trafficService.nsLight, 'red');
    const ewLight = useObservable(trafficService.ewLight, 'green');
    const isCarCrossing = useObservable(trafficService.isCarCrossing,false);

    return (
        <div className="intersection">
            <div className="vertical-road">
                <Road cars={nsQueue} direction="ns" light={nsLight} trafficService={trafficService} isCarCrossing={isCarCrossing} />
            </div>
            <div className="horizontal-road">
                <Road cars={ewQueue} direction="ew" light={ewLight} trafficService={trafficService} isCarCrossing={isCarCrossing} />
            </div>
        </div>
    );
}

export default Intersection;
