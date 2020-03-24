import { ViewManager } from './view';
import { PlayerView } from './view/player/player';
// import { FormView } from './view/form/form';
// import { HomeView } from './view/home/home';
// import { TreeView } from './view/tree/tree';

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js').then(registration => {
//             console.log('SW registered: ', registration);
//         }).catch(registrationError => {
//             console.log('SW registration failed: ', registrationError);
//         });
//     });
// }

const manager = ViewManager.createManager();
manager.showView(PlayerView, document.body);