
type Listener<T = any> = (data: T) => void;

class EventEmitter {
    private events: Record<string, Listener[]> = {};

    public on<T = any>(event: string, listener: Listener<T>): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    public emit<T = any>(event: string, data: T): void {
        const eventListeners = this.events[event];
        if (eventListeners) {
            eventListeners.forEach(listener => {
                listener(data);
            });
        }
    }

    public removeListener<T = any>(event: string, listenerToRemove: Listener<T>): void {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
        }
    }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;
