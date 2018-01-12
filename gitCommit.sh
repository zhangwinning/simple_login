#!/bin/bash -e
commit_message="$1"
if [$commit_message = ""]
then
    commit_message=":tada: update file" 
fi    
echo "$commit_message"
git add .
git commit -m "$commit_message"
git push
