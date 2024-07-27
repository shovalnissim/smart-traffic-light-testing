import { BehaviorSubject } from 'rxjs';
import {
    MAX_TIME,
    MIN_TIME, MAX_CAR,
    MIN_CAR,
    CROSSING_TIME,
    CHECKE_TRAFFIC_MIN_TIME
} from './config'

class TrafficService {
    constructor() {
        this.nsQueue = new BehaviorSubject(0);
        this.ewQueue = new BehaviorSubject(0);
        this.nsLight = new BehaviorSubject('green');
        this.ewLight = new BehaviorSubject('red');
        this.isCarCrossing = new BehaviorSubject(false);
    }

    startTrafficManagement() {
        this.addCars();
        this.changeLightByTraffic();
    }

    getRandomInterval() {
        return Math.floor(Math.random() * (MAX_TIME - MIN_TIME + 1)) + MIN_TIME;
    }

    getRandomCarNumber() {
        return Math.floor(Math.random() * MAX_CAR) + MIN_CAR;
    }

    setCarCrossingState(isDriving) {
        this.isCarCrossing.next(isDriving);
    }

    changeLightByTraffic() {
        const difference = this.nsQueue.value - this.ewQueue.value;
        if ((difference < 0 && this.nsLight.value === 'green') || (difference > 0 && this.ewLight.value === 'green')) {
            this.nsLight.next(this.nsLight.value === 'green' ? 'red' : 'green');
            this.ewLight.next(this.ewLight.value === 'red' ? 'green' : 'red');
        }

        this.changeTrafficLightTimeOut = setTimeout(() =>
            this.changeLightByTraffic(), Math.max(Math.abs(difference) * CROSSING_TIME, CHECKE_TRAFFIC_MIN_TIME));
    }

    addCars() {
        const intervalTime = this.getRandomInterval();
        const carNumberNs = this.getRandomCarNumber();
        const carNumberEw = this.getRandomCarNumber();

        this.addCarsInterval = setInterval(() => {
            this.nsQueue.next(this.nsQueue.value + carNumberNs);
            this.ewQueue.next(this.ewQueue.value + carNumberEw);
        }, intervalTime);
    }

    removeCar(direction) {
        if (direction === 'ns') {
            this.nsQueue.next(Math.max(0, this.nsQueue.value - 1));
        } else {
            this.ewQueue.next(Math.max(0, this.ewQueue.value - 1));
        }
    }

    cleanUp() {
        if (this.addCarsInterval) clearInterval(this.addCarsInterval);
        if (this.changeTrafficLightTimeOut) clearTimeout(this.changeTrafficLightTimeOut);
    }
}

export default TrafficService;
