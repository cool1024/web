
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js').then(registration => {
//             console.log('SW registered: ', registration);
//         }).catch(registrationError => {
//             console.log('SW registration failed: ', registrationError);
//         });
//     });
// }
import { ViewComponent } from "./view-component";

customElements.define('route-view', ViewComponent);
const routeView = document.createElement('route-view');
document.body.appendChild(routeView)
routeView.addViewModules([
    { name: 'HomeView',  import: import('./view/home/home')}
])
routeView.setAttribute('view', 'HomeView');