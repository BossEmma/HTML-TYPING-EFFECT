function startTypingAnimation() {
    const elements = document.getElementsByClassName('typing-effect');

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const typingSpeed = +element.getAttribute('typing-speed');
        let text = element.textContent.trim();
        let currentText = '';
        let index = 0;
        let isInView = false;
        let animationId;

        function type() {
            if (index < text.length) {
                currentText += text.charAt(index);
                element.textContent = currentText;
                index++;
            } else {
                clearInterval(animationId);
            }
        }

        function checkInView() {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;

            const inView = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= windowHeight &&
                rect.right <= windowWidth
            );

            if (inView && !isInView) {
                isInView = true;
                index = 0;
                currentText = '';
                text = element.textContent.trim();
                element.textContent = currentText;
                animationId = setInterval(type, typingSpeed);
                element.style.opacity = 1;
            } else if (!inView && isInView) {
                isInView = false;
                clearInterval(animationId);
                index = 0;
                currentText = '';
                element.textContent = currentText;
                element.style.opacity = 0;
            }
        }

        window.addEventListener('scroll', checkInView);
        window.addEventListener('resize', checkInView);
        checkInView(); // Check if already in view on page load
    }
}

// Call the function when the document is ready
document.addEventListener('DOMContentLoaded', startTypingAnimation);
