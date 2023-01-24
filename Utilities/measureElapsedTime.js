class StopWatch {
    constructor() {
      this.startMilliseconds = 0;
      this.elapsedMilliseconds = 0;
    }
  
    start() {
      this.startMilliseconds = new Date().getTime();
    }
  
    stop() {
      this.elapsedMilliseconds = new Date().getTime() - this.startMilliseconds;
    }
  }
  
  module.exports = StopWatch;
  