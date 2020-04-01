import { ViewManager } from './view';
import { HomeView } from './view/home/home';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

const manager = ViewManager.createManager();
manager.showView(HomeView, document.body);