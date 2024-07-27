import { BehaviorSubject } from 'rxjs';
import {
    MAX_TIME,
    MIN_TIME, MAX_CAR,
    MIN_CAR,
    CROSSING_TIME,
    CHECK_TRAFFIC_MIN_TIME,
    RED_LIGHT,
    GREEN_LIGHT,
    NS
} from './config'

class TrafficService {
    constructor() {
        this.nsCarsQueue = new BehaviorSubject(0);
        this.ewCarsQueue = new BehaviorSubject(0);
        this.nsTrafficLight = new BehaviorSubject(GREEN_LIGHT);
        this.ewTrafficLight = new BehaviorSubject(RED_LIGHT);
        this.isCarCrossing = new BehaviorSubject(false);
    }

    startTrafficManagement() {
        this.addCars();
        this.changeLightByTraffic();
    }

    getRandomByRange(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    setCarCrossingState(isDriving) {
        this.isCarCrossing.next(isDriving);
    }

    changeLightByTraffic() {
        const difference = this.nsCarsQueue.value - this.ewCarsQueue.value;
        if ((difference < 0 && this.nsTrafficLight.value === GREEN_LIGHT) || (difference > 0 && this.ewTrafficLight.value === GREEN_LIGHT)) {
            this.nsTrafficLight.next(this.nsTrafficLight.value === GREEN_LIGHT ? RED_LIGHT : GREEN_LIGHT);
            this.ewTrafficLight.next(this.ewTrafficLight.value === RED_LIGHT ? GREEN_LIGHT : RED_LIGHT);
        }

        this.changeTrafficLightTimeOut = setTimeout(() =>
            this.changeLightByTraffic(), Math.max(Math.abs(difference) * CROSSING_TIME, CHECK_TRAFFIC_MIN_TIME));
    }

    addCars() {
        const intervalTime = this.getRandomByRange(MAX_TIME, MIN_TIME);
        const carNumberNs = this.getRandomByRange(MAX_CAR,MIN_CAR);
        const carNumberEw = this.getRandomByRange(MAX_CAR,MIN_CAR);

        this.addCarsInterval = setInterval(() => {
            this.nsCarsQueue.next(this.nsCarsQueue.value + carNumberNs);
            this.ewCarsQueue.next(this.ewCarsQueue.value + carNumberEw);
        }, intervalTime);
    }

    removeCar(direction) {
        if (direction === NS) {
            this.nsCarsQueue.next(Math.max(0, this.nsCarsQueue.value - 1));
        } else {
            this.ewCarsQueue.next(Math.max(0, this.ewCarsQueue.value - 1));
        }
    }

    cleanUp() {
        if (this.addCarsInterval) clearInterval(this.addCarsInterval);
        if (this.changeTrafficLightTimeOut) clearTimeout(this.changeTrafficLightTimeOut);
    }
}

export default TrafficService;
