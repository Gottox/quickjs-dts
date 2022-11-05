# quickjs-dts
[quickjs](https://bellard.org/quickjs/) typescript definitions.

## installation

```bash
npm install --save-dev typescript paxys/quickjs-dts
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
