/*
До исправления контекст у функции был window, чтобы она отработала нам нужно 
вызвать функцию с контекстом ticker. Для этого мы использовали bind.
*/

function Ticker() {
    this._i = 0
    };
    Ticker.prototype = {
     tick: function() {
     console.log(this._i++);
     }
    };
    var ticker = new Ticker();
    setInterval(ticker.tick.bind(ticker), 1000);