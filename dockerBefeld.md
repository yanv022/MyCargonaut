sudo docker build -t 16793/MyCargonaut:1.0 .
sudo docker run -d -p 4215:80 16793/mycargonaut:1.0
sudo docker push 16793/mycargonaut:1.0