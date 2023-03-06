# Account Balance Masker

## What is this?
A chrome extension which enables masking of account balances when visiting certain financial websites. This extension is to help give you a little more privacy when doing your everyday banking in a browser. 

## Features

- Masks the account balances upon loading the webpage of the supported financial banking websites (is shown as "****"). 
- Unmasks the account balance by simply hovering over masked balance so you can see the original value.
- No external tracking of the masked values. Everything remains within the browser. 

## Why is this useful?:
- Privacy: This extension is useful for those who wish to have a little more privacy when doing their everyday banking in a browser in public or even at home (never know who may be peeking over your shoulder).
- Such a simply thing for a developer to make: I wanted to make something simple and useful for the community and even though this is very simple for most Financial Institutions to implement they can be slow to do so.

## How does this work?
This extension works by using the [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) API to observe the DOM for changes. When a change is detected the extension will check if the change is a change to the account balance. If it is a change to the account balance then the extension will mask the value. 

By leveraging the `manifest.json` file we can specify which websites this extension will be enabled on. This is done by specifying the `matches` property in the `manifest.json` file which ensures this extension is only enabled on the specified websites and not on any others. 

Just set it and forget it and simply hover over the masked balance to see the original value. Simple, easy and effective.

## List of supported Financial Banking Sites 
- [Personal Banking for Royal Bank of Canada (RBC)](https://www.rbcroyalbank.com/personal.html)

    ![rbc-demo](https://user-images.githubusercontent.com/40838156/200197616-6efdf406-ceda-4355-aa86-bdcf12b80bcd.gif)
    
- [Tangerine Personal Banking](https://www.tangerine.ca/)

    ![tangerine-demo](https://user-images.githubusercontent.com/40838156/201499082-5faa7384-9bf6-488f-92a8-c4ac95380a03.gif)

- [Newton Crypto Banking](https://www.newton.co/dashboard)

    ![newton-crypto-demo](https://user-images.githubusercontent.com/40838156/223011525-f6220869-e660-47d4-966a-18acd2116fae.gif)

- More coming soon!


## Get started locally. 
You must be using a Chromium-based browser in order to use this extension. 

1. If you wish to use this application simply download this repository on your computer (via git or download the latest [published tag's](https://github.com/jdboisvert/account-balance-mask/tags) zip and unzip it anywhere you wish). 
2. Go to your browser's extensions and find the `Load unpacked` option. 
3. Click on this and direct it to where you downloaded this repository. 
4. Ensure the extension is enabled (this should be the case by default). 
5. Login to your banking application and test it out :).

## Ran into a problem or have a question? 
Refer to the supported banking sites above and if a supported site is no longer working or you wish to have a new feature please enter a report on [GitHub Issues](https://github.com/jdboisvert/account-balance-mask/issues).

