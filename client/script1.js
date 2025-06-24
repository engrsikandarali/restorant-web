document.addEventListener("DOMContentLoaded", function() {
    const timeSelect = document.getElementById('time');
    const partySizeSelect = document.getElementById('party-size');
  
    // Populate time options
    for (let i = 13; i <= 23; i++) {
      for (let j = 0; j < 60; j += 15) {
        const time = `${String(i).padStart(2, '0')}:${String(j).padStart(2, '0')}`;
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
      }
    }
  
    // Populate party size options
    for (let i = 1; i <= 99; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      partySizeSelect.appendChild(option);
    }
  });
  