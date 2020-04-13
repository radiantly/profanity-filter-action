# A GitHub Action for dealing with profanity
![Status](https://github.com/radiantly/profanity-filter-action/workflows/Profanity%20check/badge.svg)

This action automatically filters issues and pull requests that contain profane words.

## Example usage

```yaml
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

This action was created during the [GitHub Actions Hackathon](https://githubhackathon.com/), and came out to be one of the winning actions. Feel free to open an issue for bugs/feature requests.
