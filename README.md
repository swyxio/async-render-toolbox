# Async Render Toolbox

> Tools to help show off - or fix - your async-mode Render apps

This is an open source chrome extension you can toggle on or off to see whats going on with your laggy ass page. No affiliation with the React team, but was inspired by their work.

![asyncreacttools2](https://user-images.githubusercontent.com/35976578/38167844-5b222948-350b-11e8-859f-1d872bfb180a.gif)

This is completely open source: https://github.com/sw-yx/async-render-toolbox I am still a nooby chrome extension developer, please tell me if I am requesting too many permissions.

## Usage - chrome extension

### Install the Chrome extension [here](https://chrome.google.com/webstore/detail/fbchcodfbfjeededacomngobhnndcgol)

Then:

* Navigate to any site (eg linkedin.com)
* Click the little browser icon to insert our javascript. Although we do request permissions, we never insert javascript on any site unless you click that button. (See our source code if you like, its open source)
* You should see the radar appear
* Now you can toggle it on or off using ctrl + R
* If you refresh your page or navigate away you'll need to click the icon to reactivate again (we try not to inject ourselves into every page, that would be douchey)
* Also try dragging the box around
* Enjoy tuning up your apps!

## Development

This is open source - and very rough right now. This repo doesn't ship with a demo but it could.

Future features:

* Firefox - compatibility: Issue here: https://github.com/sw-yx/async-react-toolbox/issues/6
* network request controls like Dan had with the Suspense demo. probably using [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) or [chrome extension intercept](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Intercept_HTTP_requests)
* please open an issue if you have an idea you wanna work on/get help with!

## Genesis

This uses LagRadar, authored by [@mobz](https://twitter.com/mobz) with ideas and contributions [from others](https://twitter.com/dan_abramov/status/970028229271670784)
for [this talk](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html)
by [@dan_abramov](https://twitter.com/dan_abramov) and shared to the world with love. Permission granted to [swyx here](https://twitter.com/swyx/status/979552959133560832).

## references

Check [https://github.com/sw-yx/fresh-async-react](https://github.com/sw-yx/fresh-async-react) for more awesome stuff.
