GIT config ini format parser and serializer for node.

## Usage

Consider an git config ini-file `.git/config` that looks like this:

    [core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        precomposeunicode = true
    [remote "origin"]
        url = https://github.com/nfer/git-config-ini
        fetch = +refs/heads/*:refs/remotes/origin/*
    [user]
        name = Nfer Zhuang

You can read, manipulate and write the ini-file like so:

    var fs = require('fs')
      , ini = require('ini')

    var config = ini.parse(fs.readFileSync('.git/config', 'utf-8'))

    config.core.filemode = false
    config.user.name = 'nfer'
    config.user.email = 'nfer@nferzhuang.com'

    fs.writeFileSync('.git/config', ini.stringify(config))


## API

### decode(inistring)

Decode the ini-style formatted `inistring` into a nested object.

### parse(inistring)

Alias for `decode(inistring)`

### encode(object)

Encode the object `object` into an ini-style formatted string.

### stringify(object)

Alias for `encode(object)`

### safe(val)

Escapes the string `val` such that it is safe to be used as a key or
value in an ini-file. Basically escapes quotes. For example

    ini.safe('"unsafe string"')

would result in

    "\"unsafe string\""

### unsafe(val)

Unescapes the string `val`
