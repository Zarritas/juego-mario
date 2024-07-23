#!/bin/bash
set -e
# Initialize a new git repository and deploy
git init
git add -A
git commit -m "deploy"

# Force push to the gh-pages branch of the specified repository
git push -f git@github.com:Zarritas/juego-mario.git main:gh-pages

# Navigate back to the original directory
cd ..

