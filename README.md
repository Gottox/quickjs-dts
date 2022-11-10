# quickjs-dts
[quickjs](https://bellard.org/quickjs/) typescript definitions.

* [x] documented source based on the
  [official documentation](https://bellard.org/quickjs/quickjs.html)
* [x] meaningful types, that may even can be used for compile time checking 
  once typescript supports
  [math intrinsic types](https://github.com/microsoft/TypeScript/pull/48198)
* [x] liberal license.

#### TODO

* [ ] add more tests to verify the behavior.

## installation

```bash
npm install --save-dev Gottox/quickjs-dts
```

tsconfig.json
```json
{
  "compilerOptions": {
    "lib": ["es2022"],
    "target": "es2022",
    "module": "es2022"
  },
  "files": ["./main.mts"]
}
```

## resources

* [Github](https://github.com/Gottox/quickjs-dts/)
* [QuickJS](https://bellard.org/quickjs/)
* [Official QuickJS Documentation](https://bellard.org/quickjs/quickjs.html)
