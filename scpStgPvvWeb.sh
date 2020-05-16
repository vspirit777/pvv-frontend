echo {\"data\":2} > src/_tmpdata.json
npm run build ;
rm .next.tar.gz
tar -cvf .next.tar.gz .next
tar -cvf static.tar.gz static
ssh -t  root@45.77.245.124 "cd /pvv/frontend/phuotvivu-web-new;mv .next.tar.gz .nextbk.tar.gz"
scp -r server.js .next.tar.gz static.tar.gz root@45.77.245.124:/pvv/frontend/phuotvivu-web-new
ssh -t  root@45.77.245.124 "cd /pvv/frontend/phuotvivu-web-new; tar -xvf .next.tar.gz;tar -xvf static.tar.gz;sh stopAndStartServer.sh"
rm src/_tmpdata.json
#echo "push git"
#git add .
#git commit -m"add"
#git push
