import React from 'react';
import { useObservable } from 'react-use';
import { NS, EW, GREEN_LIGHT, RED_LIGHT } from '../../Services/config';
import Road from '../Road/Road';
import './Intersection.css';

function Intersection({ trafficService }) {
    const nsCarsQueue = useObservable(trafficService.nsCarsQueue, 0);
    const ewCarsQueue = useObservable(trafficService.ewCarsQueue, 0);
    const nsTrafficLight = useObservable(trafficService.nsTrafficLight, RED_LIGHT);
    const ewTrafficLight = useObservable(trafficService.ewTrafficLight, GREEN_LIGHT);
    const isCarCrossing = useObservable(trafficService.isCarCrossing,false);

    return (
        <div className="intersection">
            <div className="vertical-road">
                <Road cars={nsCarsQueue} direction={NS} light={nsTrafficLight} trafficService={trafficService} isCarCrossing={isCarCrossing} />
            </div>
            <div className="horizontal-road">
                <Road cars={ewCarsQueue} direction={EW} light={ewTrafficLight} trafficService={trafficService} isCarCrossing={isCarCrossing} />
            </div>
        </div>
    );
}

export default Intersection;
