<p align="center">
  <img src="https://user-images.githubusercontent.com/40838156/224497646-e8029aaa-bd99-42f4-82a0-d00cdac8047e.png" height="250">
</p>

<h1 align="center">Account Balance Masker</h1>

## What is this?
A chrome extension which enables masking of account balances when visiting certain financial websites. This extension is to help give you a little more privacy when doing your everyday banking in a browser. 

You can now feel a little more secure when doing your banking in public or even at home (never know who may be peeking over your shoulder).

## Features

- Masks the account balances upon loading the webpage of the supported financial banking websites (is shown as "****"). 
- Unmasks the account balance by simply hovering over masked balance so you can see the original value.
- No external tracking of the masked values. Everything remains within the browser (your data is yours and yours alone).

## Why is this useful?:
- Privacy: This extension is useful for those who wish to have a little more privacy when doing their everyday banking in a browser in public or even at home (never know who may be peeking over your shoulder).
- Such a simple thing for a developer to make: I wanted to make something simple and useful for the community and even though this is very simple for most Financial Institutions to implement they can be slow to do so. So until then this can be the next best thing :). 

## How does this work?
By leveraging the `manifest.json` file we can specify which websites this extension will be enabled on. This is done by specifying the `matches` property in the `manifest.json` file which ensures this extension is only enabled on the specified websites and not on any others. This will then scan for specific elements on the page and replace the text with a masked value (****). 

Need to see your original balance? No problem! Simply hover over the masked balance and it will be replaced with the original value.

Just set it and forget it. Simple, easy and effective.

## List of Supported Financial Sites 
- [Personal Banking for Royal Bank of Canada (RBC)](https://www.rbcroyalbank.com/personal.html)

    ![rbc-demo](https://user-images.githubusercontent.com/40838156/200197616-6efdf406-ceda-4355-aa86-bdcf12b80bcd.gif)
    
- [Tangerine Personal Banking](https://www.tangerine.ca/)

    ![tangerine-demo](https://user-images.githubusercontent.com/40838156/201499082-5faa7384-9bf6-488f-92a8-c4ac95380a03.gif)

- [Newton Crypto](https://www.newton.co/dashboard)

    ![newton-crypto-demo](https://user-images.githubusercontent.com/40838156/223011525-f6220869-e660-47d4-966a-18acd2116fae.gif)


## How to install
You must be using a Chromium-based browser in order to use this extension. 

### Install from the Chrome Web Store
1. Go to the [Account Balance Masker](https://chrome.google.com/webstore/detail/account-balance-masker/hkmponiffpfpnjbgddecfhneaajddfff?hl=en) extension page on the Chrome Web Store.
2. Click on the `Add to Chrome` button.
3. Login to your banking application and test it out :).

###  Get started locally from this repository
1. If you wish to use this application simply download this repository on your computer (via git or download the latest [published tag's](https://github.com/jdboisvert/account-balance-mask/tags) zip and unzip it anywhere you wish). 
2. Go to your browser's extensions and find the `Load unpacked` option. 
3. Click on this and direct it to where you downloaded this repository. 
4. Ensure the extension is enabled (this should be the case by default). 
5. Login to your banking application and test it out :).

## Ran into a problem or have a question? 
Refer to the supported banking sites above and if a supported site is no longer working or you wish to have a new feature please enter a report on [GitHub Issues](https://github.com/jdboisvert/account-balance-mask/issues).

