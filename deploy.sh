cd /front/news
docker build -t newscrawlers .
docker run -d -p 5080:5080 newscrawlers