sh ./npm-install.sh
if [ $? -ne 0 ]; then
  echo "Error in npm or bower install"
  exit 1
fi

npm run build
if [ $? -ne 0 ]; then
  echo "Error in running grunt"
  exit 1
fi
#Zip for shipment, remove if it exists
rm -f dist.zip

cd dist
mkdir v1
find . -type d -not -name v1 -exec mv {} v1/ \;
zip -r ../dist.zip *
if [ $? -ne 0 ]; then
  echo "Zipping the build directory resulted in an error"
  exit 1
fi
cd ..
