const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Update UI to notify the user they can add to home screen
    butInstall.style.display = "block";
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Hide our user interface that shows our A2HS button
    butInstall.style.display = 'none';
    // Show the prompt
    let deferredPrompt = window.deferredPrompt;
    if (!deferredPrompt) {
      return;
    }
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    window.deferredPrompt = null;
    console.log(`User response to the install prompt: ${outcome}`);
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App installed successfully!');
});
