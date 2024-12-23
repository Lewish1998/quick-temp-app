document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    const rewardImage = document.getElementById('rewardImage');
    const rewardText = document.getElementById('rewardText');
    const segments = 8;
    const segmentAngle = 360 / segments;

    for (let i = 0; i < segments; i++) {
        const segment = document.createElement('div');
        segment.classList.add('segment');
        segment.style.transform = `rotate(${i * segmentAngle}deg)`;
        wheel.appendChild(segment);
    }

    spinButton.addEventListener('click', () => {
        const randomDegree = Math.floor(Math.random() * 360) + 3600; // Spin multiple times
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
        }, { once: true });
    });
});