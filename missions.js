const MISSIONS = {
  "pink": [
    {
      "title": "Luftballon-Mission",
      "bg": "pinklila.png",
      "text": "Sucht auf dem ganzen Hof drei pinke Luftballons und einen lila Luftballon. In den Luftballons sind Puzzleteile, die zusammengesetzt werden müssen. Wie ist das Lösungswort?",
      "type": "letters",
      "solution": "Hochterrasse",
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Der nächste Ort eurer Schatzkarten-Mission ist auf der Hochterrasse. Benutzt die Landkarte, um die Hochterrasse zu finden und geht dort hin."
    },
    {
      "title": "Geheimcode-Mission",
      "bg": "smilypink.png",
      "text": "Löst den Geheim-Code! Irgendwo auf dem Hof-Gelände ist ein Plakat versteckt, auf dem ihr die Auflösung des Geheim-Codes findet. Findet das Plakat. Wie lautet der Geheim-Code?",
      "type": "letters",
      "solution": "Unter dem Tisch im Innenhof",
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Geht zu den Bänken im Innenhof. Vorher findet ihr auf der Hochterrasse eine pinke Lochkarte. Sie ist eine Hilfe für die nächste Mission. Nehmt sie mit."
    },
    {
      "title": "Lochkarten-Mission",
      "bg": "lochpink.png",
      "text": "Um dieses Rätsel zu lösen und das Lösungswort zu erfahren, müsst ihr die Lochkarte benutzen. Danach bekommt ihr einen neuen Hinweis für den nächsten Ort eurer Mission.",
      "type": "letters",
      "solution": "GLÜHWÜRMCHEN",
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Geht zum Fahrradständer und sucht dort nach einer Umgebungskarte eurer Teamfarbe für das nächste Rätsel! Benutzt die Landkarte, um den Fahrradständer zu finden."
    },
    {
      "title": "Wander-Mission",
      "bg": "fuss.png",
      "text": "Sucht den Umgebungsplan und nehmt ihn mit! Geht zum roten X, um eine Geheimzahl zu finden. Der dreistellige Geheim-Code steht auf der silbernen Plakette auf der Bank. Wie ist der Code?",
      "type": "numbers",
      "solution": "118",
      "labels": [
        "Code"
      ],
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Geht zurück zum Hof: zum Geburtstagskuchentisch. Dort befinden sich besondere Leckerbissen. Stärkt euch und löst die Muffin-Mission."
    },
    {
      "title": "Muffin-Mission",
      "bg": "muffinpink.png",
      "text": "Stärkt euch mit etwas zu Trinken und zu Essen. Ihr findet Muffins in eurer Farbe. Fällt euch etwas auf? Schaut genau hin und ihr findet eine Zählaufgabe. Wie sind eure Ergebnisse?",
      "type": "labeledNumbers",
      "solution": "101212",
      "fields": [
        {
          "label": "Kellerstufen",
          "len": 2
        },
        {
          "label": "Schilder",
          "len": 2
        },
        {
          "label": "Bäume",
          "len": 2
        }
      ],
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Was ist das? Findet diesen Gegenstand auf dem Hof! Wenn ihr angekommen seid, drückt auf „Verstanden“.",
      "hintImage": "trampolin.png"
    },
    {
      "title": "Wimmel-Mission",
      "bg": "schwimmpink.png",
      "text": "Findet die gesuchten Objekte auf dem Wimmelbild. Zählt, wie oft sie vorhanden sind. Was sind die Lösungszahlen?",
      "type": "labeledNumbers",
      "solution": "6654",
      "fields": [
        {
          "label": "Einhörner",
          "len": 1
        },
        {
          "label": "Schirme",
          "len": 1
        },
        {
          "label": "Bälle",
          "len": 1
        },
        {
          "label": "Bademeister",
          "len": 1
        }
      ],
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Nehmt euch jeder einen UV-Geheimstift und geht zum Katzenhaus. Jetzt kommt eure letzte Mission."
    },
    {
      "title": "UV-Mission",
      "bg": "konfettipink.png",
      "text": "Sucht nach einem versteckten dreistelligen Code. Dieser ist nur mit dem UV-Stift sichtbar. Achtet darauf, dass ihr den Code eurer Teamfarbe entdeckt: Team Pink! Nur der Code von eurem Team passt zum Schloss eurer Schatzkiste.",
      "type": "numbers",
      "solution": "358",
      "labels": [
        "Code"
      ],
      "hintTitle": "Gratulation!",
      "hint": "Ihr habt das Rätsel gelöst. Geht zurück zum Geburtstagstisch. Dort steht eure Schatzkiste bereit. Öffnet sie mit eurem Code 358.",
      "finalCode": "358"
    },
    {
      "title": "Schatz geöffnet!",
      "bg": "konfettipink.png",
      "text": "Super! Eure Schatzkiste ist geöffnet. Ihr habt die Mission geschafft!",
      "type": "finish"
    }
  ],
  "gelb": [
    {
      "title": "Luftballon-Mission",
      "bg": "pinkgelb.png",
      "text": "Sucht auf dem ganzen Hof drei orangene Luftballons und einen gelben Luftballon. In den Luftballons sind Puzzleteile, die zusammengesetzt werden müssen. Wie ist das Lösungswort?",
      "type": "letters",
      "solution": "Fahrradständer",
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Der nächste Ort eurer Schatzkarten-Mission ist am Fahrradständer. Benutzt die Landkarte, um den Fahrradständer zu finden."
    },
    {
      "title": "Wander-Mission",
      "bg": "fuss.png",
      "text": "Sucht den Umgebungsplan eures Teams: Team Gelb! und nehmt ihn mit! Geht zum roten X, um einen Geheimcode zu finden. Der dreistellige Geheim-Code steht auf der silbernen Plakette auf der Bank. Wie ist der Code?",
      "type": "numbers",
      "solution": "118",
      "labels": [
        "Code"
      ],
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Geht zurück zum Geburtstagskuchentisch. Dort befinden sich besondere Leckerbissen. Stärkt euch und löst die Muffin-Mission. Benutzt die Landkarte, um den Geburtstagskuchentisch zu finden."
    },
    {
      "title": "Muffin-Mission",
      "bg": "muffingelb.png",
      "text": "Stärkt euch mit etwas zu Trinken und zu Essen. Ihr findet Muffins in eurer Farbe. Fällt euch etwas auf? Schaut genau hin und ihr findet eine Zählaufgabe. Wie sind eure Ergebnisse?",
      "type": "labeledNumbers",
      "solution": "101212",
      "fields": [
        {
          "label": "Kellerstufen",
          "len": 2
        },
        {
          "label": "Schilder",
          "len": 2
        },
        {
          "label": "Bäume",
          "len": 2
        }
      ],
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Was ist das? Sucht diesen Gegenstand auf dem Hof! Wenn ihr angekommen seid, drückt auf „Verstanden“.",
      "hintImage": "trampolin.png"
    },
    {
      "title": "Wimmel-Mission",
      "bg": "schwimmgelb.png",
      "text": "Findet die gesuchten Objekte auf dem Wimmelbild. Zählt, wie oft sie vorhanden sind. Was sind die Lösungszahlen?",
      "type": "labeledNumbers",
      "solution": "6654",
      "fields": [
        {
          "label": "Einhörner",
          "len": 1
        },
        {
          "label": "Schirme",
          "len": 1
        },
        {
          "label": "Bälle",
          "len": 1
        },
        {
          "label": "Bademeister",
          "len": 1
        }
      ],
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Nehmt euch einen UV-Geheimstift mit (ihr werdet ihn noch brauchen) und geht zur Hochterrasse. Benutzt die Landkarte, um die Hochterrasse zu finden."
    },
    {
      "title": "Geheimcode-Mission",
      "bg": "smilygelb.png",
      "text": "Löst den Geheim-Code! Irgendwo auf dem Hof-Gelände ist ein Plakat versteckt, auf dem ihr die Auflösung des Geheim-Codes findet. Findet das Plakat. Wie lautet der Geheim-Code?",
      "type": "letters",
      "solution": "Unter dem Tisch im Innenhof",
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Bevor ihr zu den Bänken im Innenhof geht, findet ihr auf der Hochterrasse einen gelben Umschlag. Darin ist eine Hilfe für die nächste Mission. Benutzt die Landkarte, um die Bänke im Innenhof zu finden."
    },
    {
      "title": "Lochkarten-Mission",
      "bg": "lochgelb.png",
      "text": "Um dieses Rätsel zu lösen und das Lösungswort zu erfahren, müsst ihr die Lochkarte benutzen. Danach bekommt ihr einen neuen Hinweis für den nächsten Ort eurer Mission.",
      "type": "letters",
      "solution": "GLÜHWÜRMCHEN",
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Geht zum Katzenhaus und haltet euren UV-Stift bereit. Jetzt kommt eure letzte Mission."
    },
    {
      "title": "UV-Mission",
      "bg": "konfettigelb.png",
      "text": "Sucht nach einem versteckten dreistelligen Code. Dieser ist nur mit dem UV-Stift sichtbar. Achtet darauf, dass ihr den Code eurer Teamfarbe entdeckt: Team Gelb! Nur der Code von eurem Team passt zum Schloss eurer Schatzkiste.",
      "type": "numbers",
      "solution": "721",
      "labels": [
        "Code"
      ],
      "hintTitle": "Gratulation!",
      "hint": "Ihr habt das Rätsel gelöst. Geht zurück zum Geburtstagstisch. Dort steht eure Schatzkiste bereit. Öffnet sie mit eurem Code. Drücke auf Verstanden, um den Code anzuzeigen.",
      "finalCode": "721"
    },
    {
      "title": "Schatz geöffnet!",
      "bg": "konfettigelb.png",
      "text": "Super! Eure Schatzkiste ist geöffnet. Ihr habt die Mission geschafft!",
      "type": "finish"
    }
  ],
  "blau": [
    {
      "title": "Luftballon-Mission",
      "bg": "pinkblau.png",
      "text": "Sucht auf dem ganzen Hof zwei blaue Luftballons und zwei grüne Luftballons. In den Luftballons sind Puzzleteile, die zusammengesetzt werden müssen. Wie ist das Lösungswort?",
      "type": "letters",
      "solution": "Trampolin",
      "hintTitle": "Weiter geht’s!",
      "hint": "Der nächste Ort eurer Schatzkarten-Mission ist beim Trampolin. Benutzt die Landkarte, um das Trampolin zu finden und geht dort hin."
    },
    {
      "title": "Wimmel-Mission",
      "bg": "schwimmblau.png",
      "text": "Findet die gesuchten Objekte auf dem Wimmelbild. Zählt, wie oft sie vorhanden sind. Was sind die Lösungszahlen?",
      "type": "labeledNumbers",
      "solution": "6654",
      "fields": [
        {
          "label": "Einhörner",
          "len": 1
        },
        {
          "label": "Schirme",
          "len": 1
        },
        {
          "label": "Bälle",
          "len": 1
        },
        {
          "label": "Bademeister",
          "len": 1
        }
      ],
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Nehmt euch jeder einen UV-Geheimstift mit und geht zur Hochterrasse. Benutzt die Landkarte, um die Hochterrasse zu finden."
    },
    {
      "title": "Geheimcode-Mission",
      "bg": "smilyblau.png",
      "text": "Löst den Geheim-Code! Irgendwo auf dem Hof-Gelände ist ein Plakat versteckt, auf dem ihr die Auflösung des Geheim-Codes findet. Findet das Plakat. Wie lautet der Geheim-Code?",
      "type": "letters",
      "solution": "Unter dem Tisch im Innenhof",
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Bevor ihr zu den Bänken im Innenhof geht, findet ihr auf der Hochterrasse eine blaue Lochkarte. Nehmt sie mit. Darin ist eine Hilfe für die nächste Mission. Benutzt die Landkarte, um die Bänke im Innenhof zu finden und geht dort hin."
    },
    {
      "title": "Lochkarten-Mission",
      "bg": "lochblau.png",
      "text": "Um dieses Rätsel zu lösen und das Lösungswort zu erfahren, müsst ihr die Lochkarte benutzen. Danach bekommt ihr einen neuen Hinweis für den nächsten Ort eurer Mission.",
      "type": "letters",
      "solution": "Glühwürmchen",
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Geht zurück zum Geburtstagskuchentisch. Dort befinden sich besondere Leckerbissen. Löst die Muffin-Mission und stärkt euch."
    },
    {
      "title": "Muffin-Mission",
      "bg": "muffinblau.png",
      "text": "Stärkt euch mit etwas zu Trinken und zu Essen. Ihr findet Muffins in eurer Farbe. Fällt euch etwas auf? Schaut genau hin und ihr findet eine Zählaufgabe. Wie sind eure Ergebnisse?",
      "type": "labeledNumbers",
      "solution": "101212",
      "fields": [
        {
          "label": "Kellerstufen",
          "len": 2
        },
        {
          "label": "Schilder",
          "len": 2
        },
        {
          "label": "Bäume",
          "len": 2
        }
      ],
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Geht zum Fahrradständer und sucht dort nach einer Umgebungskarte eurer Teamfarbe für das nächste Rätsel! Benutzt die Landkarte, um den Fahrradständer zu finden."
    },
    {
      "title": "Wander-Mission",
      "bg": "fuss.png",
      "text": "Sucht den Umgebungsplan und nehmt ihn mit! Geht zum roten X, um eine Geheimzahl zu finden. Der dreistellige Geheim-Code steht auf der silbernen Plakette auf der Bank. Wie ist der Code?",
      "type": "numbers",
      "solution": "118",
      "labels": [
        "Code"
      ],
      "hintTitle": "Nächster Missions-Hinweis",
      "hint": "Geht zurück zum Katzenhaus und haltet euren UV-Stift bereit. Jetzt kommt eure letzte Mission."
    },
    {
      "title": "UV-Mission",
      "bg": "konfettiblau.png",
      "text": "Sucht nach einem versteckten dreistelligen Code. Dieser ist nur mit dem UV-Stift sichtbar. Achtet darauf, dass ihr den Code eurer Teamfarbe entdeckt: Team Blau! Nur der Code von eurem Team passt zum Schloss eurer Schatzkiste.",
      "type": "numbers",
      "solution": "419",
      "labels": [
        "Code"
      ],
      "hintTitle": "Gratulation!",
      "hint": "Ihr habt das Rätsel gelöst. Geht zurück zum Geburtstagstisch. Dort steht eure Schatzkiste bereit. Öffnet sie mit eurem Code.",
      "finalCode": "419"
    },
    {
      "title": "Schatz geöffnet!",
      "bg": "konfettiblau.png",
      "text": "Super! Eure Schatzkiste ist geöffnet. Ihr habt die Mission geschafft!",
      "type": "finish"
    }
  ]
};
