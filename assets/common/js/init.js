(function () {
    if (window.config.EnableDevTools === null) {
        setAppConfig();
    }
}());

function setAppConfig() {
    if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
        window.config.EnableDevTools = true;
        window.config.APIUrl = window.config.LocalhostURL;
    }
    else {
        window.config.EnableDevTools = false;
        window.config.APIUrl = window.config.ProductionURL;
    }
}