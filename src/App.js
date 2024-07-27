import React, { useEffect, useMemo } from 'react';
import Intersection from './Component/Intersection/Intersection';
import TrafficService from './Services/TrafficService';

function App() {
    const trafficService = useMemo(() => new TrafficService(), []);
  
    useEffect(() => {
        trafficService.startTrafficManagement();
        return () => trafficService.cleanUp();
    }, [trafficService]);

    return (
        <div className="App">
            <Intersection trafficService={trafficService} />
        </div>
    );
}

export default App;
