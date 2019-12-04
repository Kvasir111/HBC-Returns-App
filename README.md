# Suttung

## In the beginning 

*..He now quickly shapeshifted into an eagle and flew away as fast as he could. When Suttung saw this, he changed himself into an eagle and flew after him. But Odin managed to get away from Suttung and when he arrived at Asgard, he spat the mead into three big tubs.*

*Odin gave some of the mead of poetry the Æsir and to the men in Midgard which we call poets…*

Suttung is a small Nuxt app to handle equipment returns at Hiawatha Broadband Communications. It's designed to replace the hand receipts that were used to track modems, routers, DTAs and other HBC owned equipment.

## How to use

Use is pretty straightforward
[![Main Screen](https://imgur.com/r3oq20z "Main Screen")](https://imgur.com/r3oq20z "Main Screen")

Enter the customers information in the labled boxes. All input except "Account #" and "Email" are required for the form to submit.

In the lines below, select the device type being returned, then the MAC address. Check the approprite boxes for the power cord and remote.

The MAC address field has a max length of 12 characters and a minimum of 11, so it does some crude checking to make sure the device is valid.

The return reason section is also required, select the approprite reason from the drop down, and then an explaination or additonal information in the textarea.

on clicking submit, JSPDF will generate a PDF for printing, and the app will fire off a firebase update to log the return if the PDF get's lost.

## Build Instructions🏗🏗

To install dependances
`npm install`

To run in dev mode
`npm run dev`

To run in production
`nuxt build && nuxt start`

There really isn't any reason not to generate this as a static site, but maybe in the future, it will?

## Future Plans🤔🤔🤔

At some point, I want this to either fire off a function to send emails instead of printing a paper copy and also store the generated documents in firestore. Currently, I have no motivation for this, but someday, someday I'll find the gumption.


