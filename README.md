# TCP-server
## Jak budować za pomocą Dockera
Aby zbudować obraz dla dockera :
- sklonuj repozytorium
- skompiluj obraz dockera: `DOCKER_BUILDKIT=1 docker build -f dockerfile -t local/basistyiobrazjs .`
- uruchom obraz za pomocą dockera: `docker run -d --name basistyiobrazjs-container -p 8080:4000 local/basistyiobrazjs`

