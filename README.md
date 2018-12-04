Interactive Blackjack Browser Game

To play Blackjack, you will first need to run the following commands in Terminal:

1. npm install (to install dependencies)
2. npm run build (optional - to re-generate the bundle.js frontend file)
3. npm run start (to run the node server)

Next direct your browser to http://localhost:3000

JavaScript felt like the wild west after neat and tidy Ruby, and I really enjoyed the contrast. This time the project was tackled as a group of 4 over 5 days. Given interdependence of the component parts, we opted for primarily mob programming which enabled us to plan and problem solve together effectively. I encountered a few interesting challenges:
  1. The issue of asynchronicity, for example getting the game to wait for an API request to return an additional card before checking the new total. Solved with the use of Promise objects.
  2. Planning of intricate dealer logic. By using Activity Diagrams, pseudocode and PubSub we were able to break this task up into small chunks, find patterns and use PubSub broadcasts to trigger events for various scenarios.
  3. Hiding the dealer card on initial deal. In order to achieve this, I designed the Dealer View to render it's current cards in different ways, depending on which PubSub channel was broadcast to.
Much unanticipated learning came from building this project as a team. I came to better appreciate mob programming, which was new to me, as well as the value of tools such as User Personas, user testing and MoSCoW.

Rules & Notes
1. Game checks for Blackjack upon initial deal.
2. Dealer draws on a total of 16 or less.
3. It's currently possible to run out of cards. If the game appears to stop responding, try getting a freshly shuffled deck with the provided button (this will reset totals).
4. This game is playable online on Heroku (not yet suited to mobile) : https://blackjack-js-game.herokuapp.com/

I hope you enjoy my work and I welcome your feedback.
