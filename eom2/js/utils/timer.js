export default class Timer {
    constructor(duration, display) {
        this.duration = duration;
        this.display = display;
        this.startTime = null;
        this.timerInterval = null;
        this.remainingTime = this.duration;
        this.isCountdown = true;
        this.isRunning = false;
        this.pausedTime = 0;

        const savedTimerData = JSON.parse(localStorage.getItem('timerData'));
        if (savedTimerData) {
            const { startTime, isCountdown, remainingTime, isRunning, pausedTime } = savedTimerData;
            this.startTime = startTime ? parseInt(startTime) : Date.now();
            this.isCountdown = isCountdown;
            this.remainingTime = remainingTime ? parseInt(remainingTime) : this.duration;
            if (isRunning) {
                this.isRunning = true;
                this.pausedTime = pausedTime ? parseInt(pausedTime) : 0;
                this.startTimer();
            } else if (startTime) {
                let elapsed = Math.floor((Date.now() - this.startTime) / 1000);
                let diff = isCountdown ? this.remainingTime - elapsed : elapsed;
                this.pausedTime = pausedTime ? parseInt(pausedTime) : 0;
                const { hours, minutes, seconds } = this.formatTimeToVariables(Math.abs(diff));
                const displayTime = `${hours}:${minutes}:${seconds}`;
                this.display.textContent = displayTime;
            }
        }
    }

    formatTimeToVariables(time) {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;

        hours = hours.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');

        return { hours, minutes, seconds };
    }
    
    saveTimerData() {
        const data = {
            startTime: this.startTime,
            remainingTime: this.remainingTime,
            isCountdown: this.isCountdown,
            isRunning: this.isRunning,
            pausedTime: this.pausedTime
        };
        localStorage.setItem('timerData', JSON.stringify(data));
    }

    startTimer() {
        if (this.isRunning) return false;

        this.isRunning = true;
        this.startTime = Date.now() - this.pausedTime;

        this.updateDisplay(); // Обновляем дисплей при старте таймера

        this.timerInterval = setInterval(() => {
            this.updateDisplay();
        }, 1000);

        window.addEventListener('beforeunload', () => {
            this.saveTimerData();
        });
    }

    updateDisplay() {
        const currentTime = Date.now();
        let elapsed = currentTime - this.startTime;
        if (!this.isRunning) {
            elapsed += this.pausedTime;
        }

        let diff = this.isCountdown ? this.remainingTime - Math.floor(elapsed / 1000) : Math.floor(elapsed / 1000);

        const { hours, minutes, seconds } = this.formatTimeToVariables(Math.abs(diff));
        const displayTime = `${hours}:${minutes}:${seconds}`;
        this.display.textContent = displayTime;

        if (this.isCountdown && diff <= 0) {
            clearInterval(this.timerInterval);
            this.saveTimerData();
        }
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.isRunning = false;
            this.pausedTime = Date.now() - this.startTime;
            this.saveTimerData();
        }
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.startTime = null;
        this.isRunning = false;
        this.pausedTime = 0;
        this.remainingTime = this.duration;
        this.updateDisplay();
        this.saveTimerData();
    }

    setCountdownMode(countdown) {
        this.isCountdown = countdown;
        this.saveTimerData();
    }

    getElapsedTime() {
        if (this.isRunning) {
            const currentTimeStamp = Date.now();
            const elapsed = currentTimeStamp - this.startTime + this.pausedTime;
            return Math.floor(elapsed / 1000);
        } else {
            return this.isCountdown ? this.remainingTime : this.duration - this.remainingTime;
        }
    }

    getDisplayedTime() {
        if (this.isRunning) {
            const currentTimeStamp = Date.now();
            const elapsed = currentTimeStamp - this.startTime + this.pausedTime;
            let displayedTime = this.isCountdown ?
                this.remainingTime - Math.floor(elapsed / 1000) :
                Math.floor(elapsed / 1000);

            const { hours, minutes, seconds } = this.formatTimeToVariables(Math.abs(displayedTime));

            return `${hours}:${minutes}:${seconds}`;
        } else {
            return this.display.textContent;
        }
    }
}
