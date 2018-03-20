npm test
if [ $? -ne 0 ]; then
  echo "Error in Testing"
  exit 1
fi