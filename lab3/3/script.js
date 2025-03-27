function expandBars() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.classList.toggle('expanded');
    });
}
