# A GitHub Action for dealing with profanity
![Status](https://github.com/radiantly/profanity-filter-action/workflows/Profanity%20check/badge.svg)

This action automatically filters issues that contain profane words.

## Example usage

```shell
name: Profanity check

on: 
  issues:
    types: [opened, edited]
  issue_comment:
    types: [created, edited]
  pull_request:
    types: [opened, edited]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
      - name: Profanity filter
        uses: radiantly/profanity-filter-action@v1.1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```
