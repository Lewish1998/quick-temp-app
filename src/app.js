document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    const rewardImage = document.getElementById('rewardImage');
    const rewardText = document.getElementById('rewardText');
    const segments = 8;
    const segmentAngle = 360 / segments;
    let spinCount = 0;

    for (let i = 0; i < segments; i++) {
        const segment = document.createElement('div');
        segment.classList.add('segment');
        segment.style.transform = `rotate(${i * segmentAngle}deg)`;
        wheel.appendChild(segment);
    }

    spinButton.addEventListener('click', () => {
        spinCount++;
        let randomDegree;

        if (spinCount === 5) {
            randomDegree = 3600 + (360 - (360 % segmentAngle)); // Ensure it lands on red
        } else {
            randomDegree = Math.floor(Math.random() * 360) + 3600; // Spin multiple times
        }

        wheel.style.transition = 'transform 4s ease-out';
        wheel.style.transform = `rotate(${randomDegree}deg)`;

        wheel.addEventListener('transitionend', () => {
            const actualDegree = randomDegree % 360;
            const segmentIndex = Math.floor(actualDegree / segmentAngle);
            if (segmentIndex === 0) { // Red segment
                rewardImage.style.display = 'block';
                rewardText.style.display = 'none';
            } else {
                rewardImage.style.display = 'none';
                rewardText.style.display = 'block';
                rewardText.textContent = `You Lose. Try again!`;
            }

            // Reset the wheel's rotation to ensure smooth animation next time
            setTimeout(() => {
                wheel.style.transition = 'none';
                wheel.style.transform = `rotate(${actualDegree}deg)`;
                setTimeout(() => {
                    wheel.style.transition = 'transform 4s ease-out';
                }, 50);
            }, 50);
        }, { once: true });
    });
});