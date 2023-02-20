## Pomodoro Timer | A Focus Tool

The [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) is a time management system that breaks work intervals into small, manageable sections, separated by short breaks. This app is a simplified version of the Pomodoro Technique and allows the user to change their focus and break durations.

## Installation
1. Fork and clone this repository
2. Run `npm install` to install local dependencies
3. Run `npm run start` to start the application

## Technologies

Javascript, React, HTML, CSS

![Javascript](/images/JavaScript.png)
![React](/images/React.png)
![HTML](/images/html.png)
![CSS](/images/css.png)

## Home Page

The main screen of the app displays the initial state of each object, and has the following functionalities:
- `Focus Duration`: The amount of time the user chooses to focus on their task, which can be increased or decreased by 5 minutes using the '+' or '-' buttons
- `Break Duration`: The amount of time the user chooses to break, which can be increased or decreased by 1 minute using the '+' or '-' buttons
- `Play`: Begins the timer and shows a dynamic progress bar
- `Stop`: This option is not useable until the timer begins

![Home Page](/images/Timer%20main%20page.png)

## Paused With Progress Bar

After the `Play` button is selected by the user, the timer begins and a progress bar appears on the screen which tracks how far the user is in their session. Once the timer begins, the two functionalities appear on the screen:
- `Pause`: Pauses the timer and stops the progress bar from increasing
- `Stop`: Resets all values to their initial state

![Paused](/images/Timer%20Paused.png)
