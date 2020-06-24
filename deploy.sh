cd /front/news
docker pull newscrawlers
docker run -d -p 5080:5080 newscrawlers