# CoffeeBase

This is a template app for any coffee shop to take and customize to create their own personal app where people can order coffee, aquire points, gain levels and unlock special offers.

See a **demo** of the application [here](https://coffee-base.vercel.app/).

> Coffee shop demo account:
> - email: coffee@shop.com
> - password: Password123

> Basic user demo account:
> - email: basic@email.com
> - password: Password123

## Features

### Authentication & authorization

This is one is pretty self explanatory. There are 2 account types: coffee shop account and basic user account. There is only one coffee shop account and each new user who signs up is a basic user.

### Order placement

Users can view your coffee products from the application and they can order them direcly. The payment is done via Stripe (will be added later, no time left for now :( ) and once it is confirmed the coffee shop account receives it in realtime. Also with every order the user who placed it receives points for later use.

### Order history

Each user can view its order history to see really how much money he actually spent on the bevarage who keeps him awake.

### Gamification

Each user has a level (starting from level 1). To reach higher levels he has to order items from the coffee shop based on which he gains points. Levels also let you unlock special offers which can be bought using the gained points.

### Order management

In the coffee shop view of the application you can view all of the orders in realtime and process them accordingly.

## Tech used

- Supbase
- Nuxt3
- NuxtUI
- TailwindCSS
- Vercel