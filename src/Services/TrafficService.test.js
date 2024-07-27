import TrafficService from './TrafficService';
import { GREEN_LIGHT, RED_LIGHT, NS, MAX_TIME } from './config';

describe('TrafficService', () => {
    let trafficService;

    beforeEach(() => {
        trafficService = new TrafficService();
    });

    afterEach(() => {
        trafficService.cleanUp();
    });

    test('should update car queue correctly', () => {
        trafficService.nsCarsQueue.next(5);
        expect(trafficService.nsCarsQueue.value).toBe(5);

        trafficService.removeCar(NS);
        expect(trafficService.nsCarsQueue.value).toBe(4);
    });

    test('should change traffic light based on traffic', () => {
        trafficService.nsCarsQueue.next(5);
        trafficService.ewCarsQueue.next(10);

        trafficService.changeLightByTraffic();
        expect(trafficService.nsTrafficLight.value).toBe(RED_LIGHT);
        expect(trafficService.ewTrafficLight.value).toBe(GREEN_LIGHT);

    });

    test('should add cars at random intervals', () => {
        jest.useFakeTimers();
        const initialCarsCount = trafficService.nsCarsQueue.value;

        trafficService.addCars();
        jest.advanceTimersByTime(MAX_TIME);
        expect(trafficService.nsCarsQueue.value).toBeGreaterThan(initialCarsCount);

        jest.useRealTimers();
    });

    test('should remove a car from the NS queue when direction is NS', () => {
        trafficService.nsCarsQueue.next(5);

        trafficService.removeCar(NS);
        expect(trafficService.nsCarsQueue.value).toBe(4);
    });
});
