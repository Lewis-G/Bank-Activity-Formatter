# Bank-Activity-Formatter

Requires two input files at the root of this repository.

## CSV transactions data

A history of bank transactions.
Contains 3 columns; Date, Value, Description

Example of CSV data

| Date       | Value   | Description            |
|------------|---------|------------------------|
| 2/11/2023  | -68.96  | Woolworths Purchase    |
| 1/11/2023  | -19.99  | AMAZON MARKETPLACE     |
| 1/11/2023  | 0.06    | Interest               |
| 31/10/2023 | -14.95  | Osko Payment           |
| 30/10/2023 | -260    | Rent Payment           |
| 30/10/2023 | -61.31  | Petrol Station Payment |
| 28/10/2023 | -307    | Medical Payment        |
| 27/10/2023 | 231     | Medicare Rebate        |
| 25/10/2023 | 1154    | Salary Payment         |

## Config file

Must be named, config.json

Contains the following keys.

csvInput: Name of the CSV transactions file.
txtInput: Name of the generated text file with the reformatted data.
Categories: An object containing several sub-objects, where the name of 
each sub-object is the name of a type of transaction. Each sub-object 
contains an array of keywords.

## Text output
