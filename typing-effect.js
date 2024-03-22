function startTypingAnimation() {
    const elements = document.getElementsByClassName('typing-effect');

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const delay = +element.getAttribute('typing-speed');
        const originalText = element.getAttribute('type-text');
        const StartText = element.getAttribute('start-text');
        
        let current = StartText;
        let index = 0;
        let animationId;
        let isInView = false;
        
        function typeText(){
            if (current.length >= originalText.length){
                clearInterval(animationId);
            }
            else {
                current += originalText.charAt(index);
                element.textContent = current;
                index++;
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
                current = StartText;
                element.textContent = current;
                animationId = setInterval(typeText, delay);
                element.style.opacity = 1;
            } else if (!inView && isInView) {
                isInView = false;
                clearInterval(animationId);
                current = StartText;
                element.textContent = current;
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
