# RmT [![Build Status](https://secure.travis-ci.org/chrisenytc/rmt.png?branch=master)](https://travis-ci.org/chrisenytc/rmt) [![NPM version](https://badge-me.herokuapp.com/api/npm/rmt.png)](http://badges.enytc.com/for/npm/rmt)

> A CLI tool to remove all your tweets at once

## Getting Started
Install the module with: 

```bash
$ npm install -g rmt
```

Example:

1º Enter your consumer key and consumer secret

```bash
$ rmt setup
```

2º Enter the PIN number provide by Twitter

```bash
$ rmt login
```

## Documentation

#### setup

The 'setup' action is responsible for save your consumer credentials

How to use this action

```bash
$ rmt setup

              _____           _______ 
             |  __ \         |__   __|
             | |__) | _ __ ___  | |   
             |  _  / | '_ ` _ \ | |   
             | | \ \ | | | | | || |   
             |_|  \_\|_| |_| |_||_|  

  RmT: A CLI tool to remove all your tweets at once

  Repo => https://github.com/chrisenytc/rmt
  Powered by => Christopher EnyTC

[?] Enter your twitter consumerKey: uXChHM8h2Mn8NObUQHHAm758d
[?] Enter your twitter consumerKey: 0nu8pesEslBITfVSGkBpRlnBPuoVt1pcPj2M8bSML8N8PAazCz

[ Response ] ==> 

Settings updated successfully!
```

#### login

The 'login' action is responsible for authorize RmT to access your account

How to use this action

```bash
$ rmt login

              _____           _______ 
             |  __ \         |__   __|
             | |__) | _ __ ___  | |   
             |  _  / | '_ ` _ \ | |   
             | | \ \ | | | | | || |   
             |_|  \_\|_| |_| |_||_|  

  RmT: A CLI tool to remove all your tweets at once

  Repo => https://github.com/chrisenytc/rmt
  Powered by => Christopher EnyTC

In your browser, on the opened window by RmT, log in to your twitter account, click on "Authorize" button and enter the PIN number below.

[?] Enter the pin number: 8038483

[ Response ] ==> 

Logged successfully!
```

#### profile

The 'profile' action is responsible for show your profile data

How to use this action

```bash
$ rmt profile

              _____           _______ 
             |  __ \         |__   __|
             | |__) | _ __ ___  | |   
             |  _  / | '_ ` _ \ | |   
             | | \ \ | | | | | || |   
             |_|  \_\|_| |_| |_||_|  

  RmT: A CLI tool to remove all your tweets at once

  Repo => https://github.com/chrisenytc/rmt
  Powered by => Christopher EnyTC

[ Response ] ==> 

id:        382982819
name:      Christopher EnyTC
username:  chrisenytc
location:  Stockholm, Sweden
followers: 4210
tweets:    800
createdAt: Mon Oct 17 18:49:56 +0000 2011
```

#### show [limit]

**Parameter**: `limit`

**Type**: `Number`

**Example**: `8`

The 'show' action is responsible for show your tweets

How to use this action

```bash
$ rmt show 2

              _____           _______ 
             |  __ \         |__   __|
             | |__) | _ __ ___  | |   
             |  _  / | '_ ` _ \ | |   
             | | \ \ | | | | | || |   
             |_|  \_\|_| |_| |_||_|  

  RmT: A CLI tool to remove all your tweets at once

  Repo => https://github.com/chrisenytc/rmt
  Powered by => Christopher EnyTC

[ Response ] ==> 

\- New release of Slush Node with some improvements https://t.co/FB8nFdfiXq
https://t.co/N4pxITWooc
- A api wrapper to authenticate with twitter using the PIN-based authorization method.
https://t.co/SbskpmzhYO
https://t.co/2AtNGSqamC
```

#### remove

The 'remove' action is responsible for remove all your tweets

How to use this action to remove your last tweet

```bash
$ rmt remove

              _____           _______ 
             |  __ \         |__   __|
             | |__) | _ __ ___  | |   
             |  _  / | '_ ` _ \ | |   
             | | \ \ | | | | | || |   
             |_|  \_\|_| |_| |_||_|  

  RmT: A CLI tool to remove all your tweets at once

  Repo => https://github.com/chrisenytc/rmt
  Powered by => Christopher EnyTC

[ Response ] ==> 

[?] You really want to remove your last tweet? Yes

Removing  "Testing RmT 1"

Tweet removed successfully!
```

How to use this action to remove all your tweets

```bash
$ rmt remove --all

              _____           _______ 
             |  __ \         |__   __|
             | |__) | _ __ ___  | |   
             |  _  / | '_ ` _ \ | |   
             | | \ \ | | | | | || |   
             |_|  \_\|_| |_| |_||_|  

  RmT: A CLI tool to remove all your tweets at once

  Repo => https://github.com/chrisenytc/rmt
  Powered by => Christopher EnyTC

[ Response ] ==> 

[?] You really want to remove all your tweets? Yes

Removing  "Testing RmT 8"

Removing  "Testing RmT 7"

Removing  "Testing RmT 6"

Removing  "Testing RmT 5"

Removing  "Testing RmT 4"

Removing  "Testing RmT 3"

Removing  "Testing RmT 2"

Removing  "Testing RmT 1"

[ Response ] ==> 

All your tweets are deleted successfully!
```

## Contributing

See the [CONTRIBUTING Guidelines](https://github.com/chrisenytc/rmt/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/chrisenytc/rmt/issues).

## License 

The MIT License

Copyright (c) 2015, Christopher EnyTC

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

