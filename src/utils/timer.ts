interface SubscriberType {
  id: string;
  cb: (time: number) => void;
}

class Timer {
  static time = 0;
  static id: NodeJS.Timer | null = null;
  static subscribers: SubscriberType[] = [];

  static setTime(position: number) {
    this.time = position;
    this.emit();
  }

  static start(position: number) {
    if (this.id) {
      clearInterval(this.id);
    }
    this.time = position;

    this.id = setInterval(() => {
      this.time = this.time + 1000;
      this.emit();
    }, 1000);
  }

  static stop() {
    if (this.id) {
      clearInterval(this.id);
    }
    this.id = null;
  }

  static subscribe(callback: (time: number) => void) {
    const id = crypto.randomUUID();
    this.subscribers.push({
      id,
      cb: callback,
    });

    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub.id !== id);
    };
  }

  static emit() {
    this.subscribers.forEach(({ cb }) => {
      cb(this.time);
    });
  }
}

export default Timer;
