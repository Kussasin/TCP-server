const http = require('http');
const port = 4000;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//Tworzymy obiekt serwera:
http.createServer(function (req, res) {
  res.write('Hello World! \n'); //piszemy odpowiedź do klienta

  let ip = req.socket.remoteAddress; //Uzyskiwanie zdalnego adresu serwera za pomocą metody remoteAddress()
  let currentIp = ip.slice(ip.lastIndexOf(':') + 1); //rozdzielenie ciągu znaków żeby wyświetlicz potrzebne dane
  res.write(currentIp);

  let date = new Date(); // tworzenie objektu Date
  let today = date.getFullYear() + '-' + `${(date.getMonth() + 1)}` + '-' + date.getDate(); //otrzymanie bieżącej daty

  let xhr = new XMLHttpRequest();
  xhr.open('GET', `https://ipapi.co/${currentIp}/utc_offset`, false); // Złożenie żądania do serwisu ipapi.co żeby dostać time zone klienta.
  xhr.send(); // wysłamy
  if (xhr.status != 200) {
    console.log(xhr.status + ': ' + xhr.statusText); // Jeśli status nie jest równy 200, wyświetlamy błąd.
  } else {
    var time = xhr.responseText; // otzrzymujemy tekst odpowiedzi
  }

  let plus = time / 100; //otrzymane dane dzeilimy przez 100, aby otrzymać czas w godzinach
  xhr.open('GET', 'http://worldtimeapi.org/api/timezone/Europe/London', false); // Złożenie żądania do Londynu aby dostać czas GMT 0
  xhr.send(); // wysłamy
  if (xhr.status != 200) {
    console.log(xhr.status + ': ' + xhr.statusText); // Jeśli status nie jest równy 200, wyświetlamy błąd.
  } else {
    let time = xhr.responseText; // otzrzymujemy tekst odpowiedzi
    let z = JSON.parse(time).utc_datetime; // Uzyskujemy czas UTC
    let time1 = new Date(z).getTime(); // Konwertujemy na znacznik czasu
    let timestampPlus = time1 + (plus * 60 * 60 * 1000); // Czas + godziny otrzymane od klienta
    let timePlus = new Date(timestampPlus); //Konwertujemy na czas
    let result = timePlus.toUTCString(); // Konwersja do ciągu UTC;
    res.write(`\n${result}`); // Wypisujemy datę.
  }
  console.log(`Bohdan Basistyi:  ${today} \nSerwer działa na porcie ${port}`); //wyświetlenie w logach informację o dacie 
  //uruchomienia, imienia i nazwiska autora serwera (imię i nazwisko studenta) oraz porcie 
  //TCP, na którym serwer nasłuchuje na zgłoszenia klienta.

  res.end(); //koniec nasłuchiwania 
}).listen(port); //obiekt serwera nasłuchuje na porcie 4000