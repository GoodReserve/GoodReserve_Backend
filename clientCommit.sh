git add ./views
git add ./public
FIRST_ARGUMENT="$1"
git commit -m "$FIRST_ARGUMENT"
git pull
git push -u origin master
