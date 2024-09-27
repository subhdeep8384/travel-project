document.addEventListener('DOMContentLoaded', () => {
    const owners = document.querySelectorAll('.owner');
    const introText = document.getElementById('intro-text');
    const readMoreButton = document.getElementById('read-more');

    // Animate owner sections on load
    owners.forEach((owner, index) => {
        setTimeout(() => {
            owner.classList.add('show');
        }, index * 300); // Delay for each owner
    });

    // Show intro text on button click
    readMoreButton.addEventListener('click', function() {
        if (introText.style.display === 'none' || introText.style.display === '') {
            introText.style.display = 'block';
            setTimeout(() => {
                introText.classList.add('show');
            }, 10);
            this.textContent = 'Read Less';
        } else {
            introText.classList.remove('show');
            setTimeout(() => {
                introText.style.display = 'none';
            }, 500);
            this.textContent = 'Read More';
        }
    });
});
