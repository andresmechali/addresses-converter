## Description

This script takes a list of Polkadot/Kusama addresses from an input text file, converts them to any of both formats, and stores them into an output text file.

## How to use

#### Clone repo

```bash
git clone git@github.com:andresmechali/addresses-converter.git
```

#### Install dependencies

```bash
cd addresses-converter
yarn install
```

#### Create an `input.txt` file with the addresses to convert

```text
address1
address2
...
addressN
```

#### Run the script, providing the format to convert to (`kusama`/`polkadot`)

```bash
yarn dev --format kusama
```

The converted addresses will now be available in `output.txt`. This will override the previous content of this file.

#### Custom input/output files

```bash
yarn dev --input custom-input.txt --output custom-output.txt --format polkadot
```

