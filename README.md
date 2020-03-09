# A GitHub Action for dealing with profanity
This action automatically closes issues that contain profane words.

## Example usage

```shell
name: Profanity check

on: 
  issues:
    types: [opened, edited]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
      - name: Deploy docs
        uses: radiantly/profanity-filter-action@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```
